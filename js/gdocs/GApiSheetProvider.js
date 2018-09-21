"use strict";

class GApiSheetProvider {
    
    constructor(gapi) {
        this.gapi = gapi;
        this.gCalSheet = new Object();
      }
    
    loadData(spreadsheetsRange) {
        return new Promise( (resolve, reject) => {
            this.gapi.load('client:auth2', () => { 
                resolve();
            });
        }).then( () => {
            return this._initSheetConfig(spreadsheetsRange);
        });
    }
    
    _initSheetConfig(spreadsheetsRange) {
        return this.gapi.client.init({
                apiKey : API_KEY,
                clientId : CLIENT_ID,
                discoveryDocs : DISCOVERY_DOCS,
                scope : SCOPES
        }).then( () => {
            return this._prepareSheetData(spreadsheetsRange);  
        });
    }
    
    _prepareSheetData(spreadsheetsRange) {
        const promises = new Array();
        
        spreadsheetsRange.forEach( (sheetRange) => {
            promises.push(this._initSheetDataPromise(sheetRange));
        });
        
        return Promise.all(promises)
               .then( (response) => {
                    response.forEach( (sheet) => {
                        let sheetResult = sheet.result;
                        this.gCalSheet[sheetResult.range] = new GCalSheet(sheetResult);
                    });
                    return response;
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