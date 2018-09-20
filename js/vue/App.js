class App {

    constructor(gApiSheetProvider) {
        this.gApiSheetProvider = gApiSheetProvider;
        
        this._renderView();
        
    }
    
    _renderView() {
        
      new Vue({
          el: '#app',
          data: {
              trainingHeaders: this.gApiSheetProvider.gCalSheet[SPREADSHEET_TRAINING_RANGE].sheet.headers,
              dietHeaders: this.gApiSheetProvider.gCalSheet[SPREADSHEET_DIET_RANGE].sheet.headers,
              weightHeaders: this.gApiSheetProvider.gCalSheet[SPREADSHEET_WEIGHT_RANGE].sheet.headers
          }
      });
    }
}


