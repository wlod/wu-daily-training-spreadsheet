const SPREADSHEETS_TO_LOAD = [SPREADSHEET_WEIGHT_RANGE, SPREADSHEET_DIET_RANGE, SPREADSHEET_TRAINING_RANGE];

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
          }
      
      });
      
    }
    
}


