"use strict";

class GApiSpreadsheetProvider {
    
    constructor(gapi) {
        this.gapi = gapi;
        this.gCalSpreadsheet = new Map();
      }
    
    loadData(spreadsheetsRange) {
        return new Promise( (resolve, reject) => {
            this.gapi.load('client:auth2', () => { 
                resolve();
            });
        }).then( () => {
            return this._initSpreadsheetConfig(spreadsheetsRange);
        }).then( () => {
            return this._prepareSpreadsheetData(spreadsheetsRange);
        });
    }
    
    _initSpreadsheetConfig(spreadsheetsRange) {
        return this.gapi.client.init({
                apiKey : API_KEY,
                clientId : CLIENT_ID,
                discoveryDocs : DISCOVERY_DOCS,
                scope : SCOPES
        })
    }
    
    _prepareSpreadsheetData(spreadsheetsRange) {
        const promises = new Array();
        
        spreadsheetsRange.forEach( (spreadsheetRange) => {
            promises.push(this._initSpreadsheetDataPromise(spreadsheetRange));
        });
        return Promise.all(promises)
               .then( (response) => {
                    response.forEach( (spreadsheet) => {
                        try {
                            let spreadsheetResult = spreadsheet.result;
                            this.gCalSpreadsheet.set(spreadsheetResult.range,  new GCalSpreadsheet(spreadsheetResult));
                        } catch (e) {
                            console.log(e);
                        }
                    });
                    return response;
               });
    }
    
    _initSpreadsheetDataPromise(rawRange) {
        return this.gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId : SPREADSHEET_ID,
            range : rawRange,
        });
    }
    
    dataSpreadsheetsGroupByDates() {
        const dataSpreadsheetsDate = new Map();
        const groupData = new Array();
        this.gCalSpreadsheet.forEach( (value, key, map) => {
            value.spreadsheet.dataSpreadsheetDate.forEach( (inValue, inKey) => {
                if(typeof dataSpreadsheetsDate.get(inKey) === 'undefined') {
                    dataSpreadsheetsDate.set(inKey, new Array());
                }
                dataSpreadsheetsDate.get(inKey).push(...inValue);
            });
        });
        
        dataSpreadsheetsDate.forEach( (value, key, map) => {
            SpreadsheetUtils.sortByStartTime(value);
            let daySummary = SpreadsheetUtils.prepareDaySummary(key, value);
            groupData.push({"day": key, "activities": value, "daySummary": daySummary});
        });
        return groupData
    }
    
    get gCalSpreadsheet() {
        return this._gCalSpreadsheet;
    }
    
    set gCalSpreadsheet(gCalSpreadsheet) {
        this._gCalSpreadsheet = gCalSpreadsheet;
    }
}