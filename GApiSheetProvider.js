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
var SPREADSHEET_TRAINING_RANGE = "trening!A8:M16";



class GApiSheetProvider {
    
    constructor(range, result) {
        this.range = range;
        this.result = result;
        this._initSheetConfig();
        this._initSheetData();
      }
    
}

/**
 * Initializes the API client library and sets up sign-in state listeners.
 */
function initClient() {
    gapi.client.init({
            apiKey : API_KEY,
            clientId : CLIENT_ID,
            discoveryDocs : DISCOVERY_DOCS,
            scope : SCOPES
    }).then(function() {
        initTraining(SPREADSHEET_TRAINING_RANGE);
    });
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function initTraining(rawRange) {
    gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId : SPREADSHEET_ID,
            range : rawRange,
    }).then(function(response) {

        let gCalSheet = new GCalSheet(rawRange, response.result);
        console.log(gCalSheet.debugPrint);
        console.log(gCalSheet.training.printHeaders);
        gCalSheet.dataPrint;

    }, function(response) {
        appendPre('Error: ' + response.result.error.message);
    });
};