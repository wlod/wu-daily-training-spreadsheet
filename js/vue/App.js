class App {
    
    constructor() {
        this._renderView();
    }
    
    _renderView() {
      
      new Vue({
          el: '#app',
          data: {
              sheetsData: null
          },
      
          mounted() {
              const dataProvider = new GApiSheetProvider(gapi);
              dataProvider.loadData(SPREADSHEETS_TO_LOAD).then( () => {
                  this.sheetsData = dataProvider.dataSheetsGroupByDates();
              });
          },
          
          methods: {
              filterByDayAndSpreadsheetName: function (day, spreadsheetName) {
                this.sheetsData.forEach( (item) => {
                    if(item.day !== day) {
                        return;
                    }
                    
                    item.activities.forEach( (activity) => {
                        if(activity.spreadsheetName === spreadsheetName) {
                            activity.isVisible = !activity.isVisible;
                        }
                    });
                });
              },
              
              filterBySpreadsheetName: function (spreadsheetName) {
                  this.sheetsData.forEach( (item) => {
                      item.activities.forEach( (activity) => {
                          if(activity.spreadsheetName === spreadsheetName) {
                              activity.isVisible = !activity.isVisible;
                          }
                      });
                  });
                }
          },
      
      });
      
    }
    
}


