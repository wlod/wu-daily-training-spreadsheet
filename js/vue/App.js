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

            created() {
                SPREADSHEETS_TO_LOAD.forEach( (spreadsheetName) => {
                    this.visibleSpreadsheets[spreadsheetName] = true;
                    this.visibleSpreadsheetsPerDay[spreadsheetName] = new Array();
                });
            },
          
            mounted() {
                const dataProvider = new GApiSpreadsheetProvider(gapi);
                dataProvider.loadData(SPREADSHEETS_RANGE_TO_LOAD)
                            .then( () => {
                                    this.spreadsheetsData = dataProvider.dataSpreadsheetsGroupByDates();
                                    this.spreadsheetsData.forEach( (item) => {
                                        SPREADSHEETS_TO_LOAD.forEach( (spreadsheetName) => {
                                            this.visibleSpreadsheetsPerDay[spreadsheetName][item.day] = true;
                                        });
                                    } );
                            })
                            .then( () => {
                                // TODO move to method
                                var views = [];
                                var triggers = document.querySelectorAll('.image-trigger');
                                [].forEach.call(triggers, function(element, index) {
                                    views[index] = new Views(element, {
                                        defaultTheme: true,
                                        prefix: 'light',
                                        loader: 'Loading...',
                                        anywhereToClose: true,
                                        openAnimationDuration: 400,
                                        closeAnimationDuration: 400
                                    });
                                });
                            });
            },
          
            methods: {
                filterByDayAndSpreadsheetName: function (day, spreadsheetName) {
                    let allHasTheSameVisibleValue = true;
                    this.spreadsheetsData.forEach( (item) => {
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
                    this.spreadsheetsData.forEach( (item) => {
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