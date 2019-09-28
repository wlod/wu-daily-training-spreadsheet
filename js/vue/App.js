"use strict";

class App {

    constructor() {
        this._renderView();
    }

    _renderView() {

        new Vue({
            el: '#app',
            data: {
                spreadsheetsLink: null,
                spreadsheetsData: null,

                dataLoading: false,
                visibleSpreadsheets: [],
                visibleSpreadsheetsPerDay: [],
                spreadsheets: [],

                repositoryLastUpdate: null
            },

            beforeCreate() {
                this.controlVersionRepositoryProvider = new ControlVersionRepositoryProvider();
                this.dataProvider = new GApiSpreadsheetProvider(gapi);

                this.loadApplicationConfig = [{spreadsheet: APP_CONFIGURATION_SPREADSHEET}];
                this.loadContentConfig = [{
                    spreadsheet: LABEL_CONFIGURATION_SPREADSHEET,
                    parent: LABELS_KEY
                }, {
                    spreadsheet: ICON_CONFIGURATION_SPREADSHEET,
                    parent: ICONS_KEY
                }, {spreadsheet: RANGE_CONFIGURATION_SPREADSHEET}];

                this.selectedSpreadsheetLink;
            },

            mounted() {
                this.loadRepositoryData();
                this.loadSpreadsheetLinks();
            },

            methods: {

                loadRepositoryData: function() {

                    this.controlVersionRepositoryProvider.loadData().then( () => {
                        const lastUpdateDate = new Date(this.controlVersionRepositoryProvider.getLastUpdateDate());
                        this.repositoryLastUpdate = lastUpdateDate.toLocaleDateString() + " - " + lastUpdateDate.toLocaleTimeString();
                    });

                },

                loadSpreadsheetLinks: function () {
                    this.dataProvider.loadSpreadsheetsLink(LIST_CONFIGURATION_SPREADSHEET)
                        .then((loadedSpreadsheetsLink) => {
                            this.spreadsheetsLink = loadedSpreadsheetsLink;
                        });
                },

                initData: function () {
                    this.spreadsheetsData = null;
                    this.dataLoading = false;

                    this.visibleSpreadsheets = [];
                    this.visibleSpreadsheetsPerDay = [];
                    this.spreadsheets = [];
                },

                loadSpreadsheet: function (spreadsheetLink) {
                    console.debug("Load spreadsheet", spreadsheetLink);
                    if (typeof this.selectedSpreadsheetLink !== "undefined" && this.selectedSpreadsheetLink !== null) {
                        this.selectedSpreadsheetLink.data.isSelected = false;
                    }

                    spreadsheetLink.data.isSelected = true;
                    this.selectedSpreadsheetLink = spreadsheetLink;

                    this.loadData(spreadsheetLink.data.id, spreadsheetLink.data.label);
                },

                loadData: function (spreadsheetId, label) {
                    this.initData();
                    this.dataLoading = true;

                    if (WebUtil.isDevOptionIsOn("no-data") === true) {
                        this.spreadsheetsData = new Map();
                        return;
                    }

                    this.dataProvider.loadData(spreadsheetId, this.loadApplicationConfig, this.loadContentConfig)
                        .then(() => {
                            SPREADSHEET_CONF.SPREADSHEETS_TO_LOAD.forEach((spreadsheetName) => {
                                this.visibleSpreadsheets[spreadsheetName] = true;
                                this.visibleSpreadsheetsPerDay[spreadsheetName] = [];
                                this.spreadsheets.push(spreadsheetName);
                            });

                            this.spreadsheetsData = this.dataProvider.dataSpreadsheetsGroupByDates(spreadsheetId);
                            this.spreadsheetsData.forEach((item) => {
                                SPREADSHEET_CONF.SPREADSHEETS_TO_LOAD.forEach((spreadsheetName) => {
                                    this.visibleSpreadsheetsPerDay[spreadsheetName][item.day] = true;
                                });
                            });
                            this.spreadsheetsData.label = label;
                        })
                        .then(() => {
                            if (WebUtil.isDevOptionIsOn("no-image") === true) {
                                return;
                            }
                            ExtViews.appendViewsToImageWithLibraries();
                        });
                },

                filterByDayAndSpreadsheetName: function (day, spreadsheetName) {
                    let allHasTheSameVisibleValue = true;
                    this.spreadsheetsData.forEach((item) => {
                        item.activities.forEach((activity) => {
                            if (activity.spreadsheetName !== spreadsheetName) {
                                return;
                            }
                            if (item.day === day) {
                                activity.isVisible = !activity.isVisible;
                                this.visibleSpreadsheetsPerDay[spreadsheetName][day] = activity.isVisible;
                            }
                            if (allHasTheSameVisibleValue !== this.visibleSpreadsheets[spreadsheetName]) {
                                this.visibleSpreadsheets[spreadsheetName] = false;
                            }
                        });
                    });
                },

                filterBySpreadsheetName: function (spreadsheetName) {
                    this.visibleSpreadsheets[spreadsheetName] = !this.visibleSpreadsheets[spreadsheetName];
                    const isVisible = this.visibleSpreadsheets[spreadsheetName];
                    this.spreadsheetsData.forEach((item) => {
                        item.activities.forEach((activity) => {
                            if (activity.spreadsheetName === spreadsheetName) {
                                activity.isVisible = isVisible;
                            }
                        });
                        this.visibleSpreadsheetsPerDay[spreadsheetName][item.day] = isVisible;
                    });

                }
            },

        });
    }
}