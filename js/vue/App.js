const SPREADSHEETS_TO_LOAD = [SPREADSHEET_WEIGHT_RANGE, SPREADSHEET_DIET_RANGE, SPREADSHEET_TRAINING_RANGE];

class App {
    constructor() {
        
        this.dataProvider = new GApiSheetProvider(gapi);
        this.dataProvider.loadData(SPREADSHEETS_TO_LOAD).then( () => {
            this._renderView();
        });
    }
    
    _renderView() {
        
      new Vue({
          el: '#app',
          data: {
              trainingHeaders: this.dataProvider.gCalSheet[SPREADSHEET_TRAINING_RANGE].sheet.headers,
              dietHeaders: this.dataProvider.gCalSheet[SPREADSHEET_DIET_RANGE].sheet.headers,
              weightHeaders: this.dataProvider.gCalSheet[SPREADSHEET_WEIGHT_RANGE].sheet.headers
          }
      });
    }
}


