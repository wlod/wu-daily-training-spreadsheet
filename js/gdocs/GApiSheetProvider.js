"use strict";

class GApiSheetProvider {
    
    constructor(gapi) {
        this.gapi = gapi;
        this.gCalSheet = new Map();
      }
    
    loadData(spreadsheetsRange) {
        return new Promise( (resolve, reject) => {
            this.gapi.load('client:auth2', () => { 
                resolve();
            });
        }).then( () => {
            return this._initSheetConfig(spreadsheetsRange);
        }).then( () => {
            return this._prepareSheetData(spreadsheetsRange);
        });
    }
    
    _initSheetConfig(spreadsheetsRange) {
        return this.gapi.client.init({
                apiKey : API_KEY,
                clientId : CLIENT_ID,
                discoveryDocs : DISCOVERY_DOCS,
                scope : SCOPES
        })
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
                        this.gCalSheet.set(sheetResult.range,  new GCalSheet(sheetResult));
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
    
    dataSheetsByDate(date) {
        const dataSheetsDate = new Array();
        this.gCalSheet.forEach( (value, key, map) => {
            dataSheetsDate.push(...value.sheet.dataSheetDate.get(date));
        });
        return dataSheetsDate
    }
    
    dataSheetsGroupByDates() {
        const dataSheetsDate = new Map();
        const groupData = new Array();
        this.gCalSheet.forEach( (value, key, map) => {
            value.sheet.dataSheetDate.forEach( (inValue, inKey) => {
                if(typeof dataSheetsDate.get(inKey) === 'undefined') {
                    dataSheetsDate.set(inKey, new Array());
                }
                dataSheetsDate.get(inKey).push(...inValue);
            });
        });
        
        dataSheetsDate.forEach( (value, key, map) => {
            SheetUtils.sortByStartTime(value);
            groupData.push({"day": key, "activities": value});
        });
        return groupData
    }
    
    get gCalSheet() {
        return this._gCalSheet;
    }
    
    set gCalSheet(gCalSheet) {
        this._gCalSheet = gCalSheet;
    }
}