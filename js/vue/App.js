class App {
    
    constructor() {
        this._renderView();
    }
    
    _renderView() {
      
        new Vue({
            el: '#app',
            data: {
                spreadsheetsData: null,
                
                visibleSpreadsheets: new Array(),
                visibleSpreadsheetsPerDay: new Array(),
            },

            mounted() {
                const dataProvider = new GApiSpreadsheetProvider(gapi);
                dataProvider.loadData(APP_CONFIGURATION_SPREADSHEET, LABEL_CONFIGURATION_SPREADSHEET, ICON_CONFIGURATION_SPREADSHEET, RANGE_CONFIGURATION_SPREADSHEET)
                            .then( () => {
                                    SPREADSHEET_CONF.SPREADSHEETS_TO_LOAD.forEach( (spreadsheetName) => {
                                        this.visibleSpreadsheets[spreadsheetName] = true;
                                        this.visibleSpreadsheetsPerDay[spreadsheetName] = new Array();
                                    });
                                
                                    this.spreadsheetsData = dataProvider.dataSpreadsheetsGroupByDates();
                                    this.spreadsheetsData.forEach( (item) => {
                                        SPREADSHEET_CONF.SPREADSHEETS_TO_LOAD.forEach( (spreadsheetName) => {
                                            this.visibleSpreadsheetsPerDay[spreadsheetName][item.day] = true;
                                        });
                                    } );
                            })
                            .then( () => {
                                if(WebUtil.isDevOptionIsOn("noimage") === true) {
                                    return;
                                }
                                ExtViews.appendViewsToImage();
                            });
            },
          
            methods: {
                filterByDayAndSpreadsheetName: function (day, spreadsheetName) {
                    let allHasTheSameVisibleValue = true;
                    this.spreadsheetsData.forEach( (item) => {
                        item.activities.forEach( (activity) => {
                            if(activity.spreadsheetName !== spreadsheetName) {
                                return;
                            }
                            if(item.day === day) {
                                activity.isVisible = !activity.isVisible;
                                this.visibleSpreadsheets[spreadsheetName] = activity.isVisible;
                            }
                            if(allHasTheSameVisibleValue !== this.visibleSpreadsheets[spreadsheetName]) {
                                this.visibleSpreadsheets[spreadsheetName] = false;
                            }
                        });
                    });
                  },
              
                filterBySpreadsheetName: function (spreadsheetName) {
                    this.visibleSpreadsheets[spreadsheetName] = !this.visibleSpreadsheets[spreadsheetName];
                    const isVisible = this.visibleSpreadsheets[spreadsheetName];
                    this.spreadsheetsData.forEach( (item) => {
                        item.activities.forEach( (activity) => {
                          if(activity.spreadsheetName === spreadsheetName) {
                              activity.isVisible = isVisible;
                          }
                        });
                        this.visibleSpreadsheetsPerDay[spreadsheetName][item.day] = isVisible;
                  });
                },
          },
      });
    }
}