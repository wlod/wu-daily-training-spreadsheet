const SPREADSHEETS_TO_LOAD = [SPREADSHEET_WEIGHT_RANGE, SPREADSHEET_DIET_RANGE, SPREADSHEET_TRAINING_RANGE];

class App {
    
    constructor() {
        this.dataProvider = new GApiSheetProvider(gapi);
        this.dataProvider.loadData(SPREADSHEETS_TO_LOAD).then( () => {
            this._renderView();
        });
    }
    
    _renderView() {
      const allData = this.dataProvider.dataSheetsGroupByDates();
      
      new Vue({
          el: '#app',
          data: {
              trainingHeaders: this._getHeaders(SPREADSHEET_TRAINING_RANGE),
              dietHeaders: this._getHeaders(SPREADSHEET_DIET_RANGE),
              weightHeaders: this._getHeaders(SPREADSHEET_WEIGHT_RANGE),
              
              sheetsData: allData
          }
      });
      
    }
    
    _getHeaders(spreadsheet) {
        return this.dataProvider.gCalSheet.get(spreadsheet).sheet.headers;
    }
}


