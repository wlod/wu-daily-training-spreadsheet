"use strict";

class GApiSpreadsheetProvider {

    constructor(gapi) {
        this.gapi = gapi;
        this.gCalSpreadsheetsCache = new Map();
    }


    loadSpreadsheetsLink(loadSpreadsheetListConfig) {
        return new Promise((resolve) => {
            this.gapi.load('client:auth2', () => {
                resolve();
            });
        }).then(() => {
            return this._initSpreadsheetConnection();
        }).then(() => {
            // Load spreadsheets id from configuration
            return this._initSpreadsheetDataPromise(SPREADSHEET_LIST_ID, loadSpreadsheetListConfig);
        }).then((spreadsheetResult) => {
            // TODO It should be used GCalSpreadsheet - but configuration to parsing is providing by each spreadsheet.
            // For now - spreadsheet with links to training spreadsheet doesn't contains any configuration.
            const spreadsheetsLink = [];

            // TODO Null-safe for spreadsheetResult.result.values
            spreadsheetResult.result.values.forEach((spreadsheetLink) => {
                spreadsheetsLink.push(new GCalSpreadsheetLink(spreadsheetLink));
            });

            return spreadsheetsLink;
        });
    }

    loadData(spreadsheetId, loadApplicationConfig, loadContentConfig) {
        if (typeof this.gCalSpreadsheetsCache.get(spreadsheetId) !== "undefined") {
            console.debug("Return prepared data from cache for spreadsheetId", spreadsheetId);
            return new Promise((resolve) => {
                resolve();
            });
        }


        return new Promise((resolve) => {
            this.gapi.load('client:auth2', () => {
                resolve();
            });
        }).then(() => {
            return this._initSpreadsheetConnection();
        }).then(() => {
            // Load application configuration from spreadsheets
            const promises = [];
            loadApplicationConfig.forEach((spreadsheetConfig) => {
                promises.push(this._initSpreadsheetDataPromise(spreadsheetId, spreadsheetConfig.spreadsheet));
            });

            return Promise.all(promises);

        }).then((applicationConfigurations) => {
            // Apply application configuration
            const promises = [];
            applicationConfigurations.forEach((loadedSpreadsheet) => {
                promises.push(this._initConfig(loadedSpreadsheet));
            });

            return Promise.all(promises);

        }).then(() => {
            // Load content configuration from spreadsheets
            const promises = [];
            loadContentConfig.forEach((spreadsheetConfig) => {
                promises.push(this._initSpreadsheetDataPromise(spreadsheetId, spreadsheetConfig.spreadsheet));
            });

            return Promise.all(promises);

        }).then((contentConfigurations) => {
            // Apply content configuration
            const promises = [];
            contentConfigurations.forEach((loadedSpreadsheet) => {
                let parentConfig;
                loadContentConfig.forEach((loadContentConfig) => {
                    if (typeof loadContentConfig.parent !== "undefined" && loadContentConfig.spreadsheet === loadedSpreadsheet.result.range) {
                        parentConfig = loadContentConfig.parent;
                        return;
                    }
                });
                promises.push(this._initConfig(loadedSpreadsheet, parentConfig));
            });

            return Promise.all(promises);
        }).then(() => {
            return this._prepareSpreadsheetData(spreadsheetId, SPREADSHEET_CONF.SPREADSHEETS_RANGE_TO_LOAD);
        });
    }

    _initSpreadsheetConnection() {
        return this.gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
        })
    }

    _initConfig(config, parentConfig) {
        return new Promise((resolve) => {
            try {
                config.result.values.forEach((row) => {
                    try {
                        SPREADSHEET_CONF.appendPropertyFromRow(row, parentConfig);
                    } catch (e) {
                        console.log("Problem with append property to spreadsheet configuration.", row);
                        console.log(e);
                    }
                });
            } catch (e) {
                console.log("Problem with get configuration.", config);
                console.log(e);
            }

            resolve();
        });
    }

    _prepareSpreadsheetData(spreadsheetId, spreadsheetsRange) {
        const promises = [];
        spreadsheetsRange.forEach((spreadsheetRange) => {
            promises.push(this._initSpreadsheetDataPromise(spreadsheetId, spreadsheetRange));
        });

        return Promise.all(promises)
            .then((response) => {
                response.forEach((spreadsheet) => {
                    const spreadsheetResult = spreadsheet.result;
                    if (typeof this.gCalSpreadsheetsCache.get(spreadsheetId) === "undefined") {
                        this.gCalSpreadsheetsCache.set(spreadsheetId, new Map());
                    }
                    this.gCalSpreadsheetsCache.get(spreadsheetId).set(spreadsheetResult.range, new GCalSpreadsheet(spreadsheetResult));
                });
                return response;
            });
    }

    _initSpreadsheetDataPromise(spreadsheetId, rawRange) {
        return this.gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: rawRange,
        });
    }

    dataSpreadsheetsGroupByDates(spreadsheetId) {
        const dataSpreadsheetsDate = new Map();
        const groupData = [];
        this.gCalSpreadsheetsCache.get(spreadsheetId).forEach((value) => {
            value.spreadsheet.dataSpreadsheetDate.forEach((inValue, inKey) => {
                if (typeof dataSpreadsheetsDate.get(inKey) === "undefined") {
                    dataSpreadsheetsDate.set(inKey, []);
                }
                dataSpreadsheetsDate.get(inKey).push(...inValue);
            });
        });

        dataSpreadsheetsDate.forEach((value, key) => {
            SpreadsheetUtils.sortByStartTime(value);
            let daySummary = SpreadsheetUtils.prepareDaySummary(key, value);
            groupData.push({"day": key, "activities": value, "daySummary": daySummary});
        });
        return groupData
    }
}