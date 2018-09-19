"use strict";

class GApiSheetProvider {
    
    constructor(gapi) {
        this.gapi = gapi;
        this.gCalSheet = new Object();
      }
    
    loadData(spreadsheetRange, fDataLoaded) {
        this.gapi.load('client:auth2', () => { 
            this._initSheetConfig(spreadsheetRange, fDataLoaded);
        });
    }
    
    _initSheetConfig(spreadsheetRange, fDataLoaded) {
        this.gapi.client.init({
                apiKey : API_KEY,
                clientId : CLIENT_ID,
                discoveryDocs : DISCOVERY_DOCS,
                scope : SCOPES
        }).then(() => {
            this._initSheetData(spreadsheetRange, fDataLoaded);
        });
    }
    
    _initSheetData(rawRange, fDataLoaded) {
        this.gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId : SPREADSHEET_ID,
            range : rawRange,
        }).then((response) => {
            this.gCalSheet[rawRange] = new GCalSheet(rawRange, response.result);
            fDataLoaded();
        }, (response) => {
            appendPre('Error: ' + response.result.error.message);
        });
    }
    
    get gCalSheet() {
        return this._gCalSheet;
    }
    
    set gCalSheet(gCalSheet) {
        this._gCalSheet = gCalSheet;
    }
}