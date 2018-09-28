class App {
    
    constructor() {
        this._renderView();
    }
    
    _renderView() {
      
        new Vue({
            el: '#app',
            data: {
                sheetsData: null,
                
                visibleSpreadsheets: new Array(),
                visibleSpreadsheetsPerDay: new Array(),
            },

            created() {
                SPREADSHEETS_TO_LOAD.forEach( (spreadsheetName) => {
                    this.visibleSpreadsheets[spreadsheetName] = true;
                    this.visibleSpreadsheetsPerDay[spreadsheetName] = new Array();
                });
            },
          
            mounted() {
                const dataProvider = new GApiSheetProvider(gapi);
                dataProvider.loadData(SPREADSHEETS_RANGE_TO_LOAD).then( () => {
                    this.sheetsData = dataProvider.dataSheetsGroupByDates();
                    
                    this.sheetsData.forEach( (item) => {
                        SPREADSHEETS_TO_LOAD.forEach( (spreadsheetName) => {
                            this.visibleSpreadsheetsPerDay[spreadsheetName][item.day] = true;
                        });
                    } );
                    
                });
            },
          
            methods: {
                filterByDayAndSpreadsheetName: function (day, spreadsheetName) {
                    let allHasTheSameVisibleValue = true;
                    this.sheetsData.forEach( (item) => {
                        item.activities.forEach( (activity) => {
                            if(activity.spreadsheetName === spreadsheetName) {
                                if(item.day === day) {
                                    activity.isVisible = !activity.isVisible;
                                    this.visibleSpreadsheets[spreadsheetName] = activity.isVisible;
                                }
                                if(allHasTheSameVisibleValue !== this.visibleSpreadsheets[spreadsheetName]) {
                                    this.visibleSpreadsheets[spreadsheetName] = false;
                                }
                            }
                        });
                    });
                  },
              
                filterBySpreadsheetName: function (spreadsheetName) {
                    this.visibleSpreadsheets[spreadsheetName] = !this.visibleSpreadsheets[spreadsheetName];
                    this.sheetsData.forEach( (item) => {
                        item.activities.forEach( (activity) => {
                          if(activity.spreadsheetName === spreadsheetName) {
                              activity.isVisible = this.visibleSpreadsheets[spreadsheetName];
                          }
                        });
                        
                        this.visibleSpreadsheetsPerDay[spreadsheetName][item.day] = this.visibleSpreadsheets[spreadsheetName];
                  });
                },
          },
      });
    }
}