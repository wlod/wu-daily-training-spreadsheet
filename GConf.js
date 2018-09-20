"use strict";

// Client ID and API key from the Developer Console
const CLIENT_ID = '418597576423-5nv3ndftur1f3n8avthqq1o4uopjaf01.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDMgqOEObXEA-nSA7rr19IGZziiuEJAwu0';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = [ "https://sheets.googleapis.com/$discovery/rest?version=v4" ];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

// Spreadsheet ID
// Public doc: https://docs.google.com/spreadsheets/d/1W2lIqTBXORVBdAM1AaGQIY4KzDRYCqTDN8NUYEm4jt8/edit#gid=1777293991
const SPREADSHEET_ID = "1W2lIqTBXORVBdAM1AaGQIY4KzDRYCqTDN8NUYEm4jt8";

// Spreadsheet name and range
// training
const SPREADSHEET_TRAINING_RANGE = "trening!A8:Q40";
// diet
const SPREADSHEET_DIET_RANGE = "dieta!A4:K36";
// weight
const SPREADSHEET_WEIGHT_RANGE = "waga!A4:O36";


// App conf
const SPREADSHEET_CELL_VALUE_DELIMITER = "~";
