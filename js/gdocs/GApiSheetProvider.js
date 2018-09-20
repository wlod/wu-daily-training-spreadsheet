"use strict";

class GApiSheetProvider {
    
    constructor(gapi) {
        this.gapi = gapi;
        this.gCalSheet = new Object();
      }
    
    loadData(spreadsheetsRange, fDataLoaded) {
        this.gapi.load('client:auth2', () => { 
            this._initSheetConfig(spreadsheetsRange, fDataLoaded);
        });
    }
    
    _initSheetConfig(spreadsheetsRange, fDataLoaded) {
        this.gapi.client.init({
                apiKey : API_KEY,
                clientId : CLIENT_ID,
                discoveryDocs : DISCOVERY_DOCS,
                scope : SCOPES
        }).then(() => {
            
            let promises = new Array();
            
            spreadsheetsRange.forEach((sheetRange) => {
                promises.push(this._initSheetDataPromise(sheetRange));
            });
            
            Promise.all(promises)
                   .then((response) => {
                        response.forEach((sheet) => {
                            let sheetResult = sheet.result;
                            this.gCalSheet[sheetResult.range] = new GCalSheet(sheetResult);
                        });
                        fDataLoaded();
                   });
        });
    }
    
    _initSheetDataPromise(rawRange) {
        return this.gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId : SPREADSHEET_ID,
            range : rawRange,
        });
    }
    
    get gCalSheet() {
        return this._gCalSheet;
    }
    
    set gCalSheet(gCalSheet) {
        this._gCalSheet = gCalSheet;
    }
}