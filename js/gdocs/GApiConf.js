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

// Configuration
const SPREADSHEET_CONFIGURATION = "cfg";
const SPREADSHEET_CONFIGURATION_APPLY_SPREADSHEATS_RANGE = [SPREADSHEET_CONFIGURATION + "!A2:B1000"];

const GOOGLE_DRIVE_HTML_IMG_LINK_PATTERN = "https://drive.google.com/uc?id={{ID}}&export=download"
const GOOGLE_DRIVE_IMAGE_LINK_PATTERN = /https:\/\/drive.google.com\/file\/d\/(.*?)\/view\?usp=sharing/;