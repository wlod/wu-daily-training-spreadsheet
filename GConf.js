"use strict";

// Client ID and API key from the Developer Console
var CLIENT_ID = '418597576423-5nv3ndftur1f3n8avthqq1o4uopjaf01.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDMgqOEObXEA-nSA7rr19IGZziiuEJAwu0';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = [ "https://sheets.googleapis.com/$discovery/rest?version=v4" ];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

// Spreadsheet ID
// Public doc: https://docs.google.com/spreadsheets/d/1W2lIqTBXORVBdAM1AaGQIY4KzDRYCqTDN8NUYEm4jt8/edit#gid=1777293991
var SPREADSHEET_ID = "1W2lIqTBXORVBdAM1AaGQIY4KzDRYCqTDN8NUYEm4jt8";

// Spreadsheet name and range
// training
var SPREADSHEET_TRAINING_RANGE = "trening!A8:Q40";
var SPREADSHEET_DIET_RANGE = "dieta!A4:K36";
var SPREADSHEET_WEIGHT_RANGE = "waga!A4:AO36";


// App conf
var SPREADSHEET_CELL_VALUE_DELIMITER = "~";
