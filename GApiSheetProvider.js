"use strict";

class GApiSheetProvider {
    
    constructor(gapi) {
        this.gapi = gapi;
        this.gCalSheet = new Object();
      }
    
    loadData(spreadsheetRange, fDataLoaded) {
        let self = this;
        this.gapi.load('client:auth2', function() { 
            self._initSheetConfig(spreadsheetRange, fDataLoaded);
        });
    }
    
    _initSheetConfig(spreadsheetRange, fDataLoaded) {
        let self = this;
        this.gapi.client.init({
                apiKey : API_KEY,
                clientId : CLIENT_ID,
                discoveryDocs : DISCOVERY_DOCS,
                scope : SCOPES
        }).then(function() {
            self._initSheetData(spreadsheetRange, fDataLoaded);
        });
    }
    
    _initSheetData(rawRange, fDataLoaded) {
        let self = this;
        this.gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId : SPREADSHEET_ID,
            range : rawRange,
        }).then(function(response) {
            self.gCalSheet[rawRange] = new GCalSheet(rawRange, response.result);
            fDataLoaded();
        }, function(response) {
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