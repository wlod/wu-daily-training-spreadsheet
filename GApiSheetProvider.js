"use strict";

// Client ID and API key from the Developer Console
var CLIENT_ID = '418597576423-5nv3ndftur1f3n8avthqq1o4uopjaf01.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDMgqOEObXEA-nSA7rr19IGZziiuEJAwu0';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = [ "https://sheets.googleapis.com/$discovery/rest?version=v4" ];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

// Spreadsheet ID + name and range:
var SPREADSHEET_ID = "1W2lIqTBXORVBdAM1AaGQIY4KzDRYCqTDN8NUYEm4jt8";
// training name and range
var SPREADSHEET_TRAINING_RANGE = "trening!A8:Q40";

class GApiSheetProvider {
    
    constructor(gapi) {
        this.gapi = gapi;
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
            self.gCalSheet = new GCalSheet(rawRange, response.result);
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