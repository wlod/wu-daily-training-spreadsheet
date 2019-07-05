"use strict";

class GCalSpreadsheet {
    constructor(result) {
        this.range = result.range;
        this.result = result;
        this._initSpreadsheetConfig();
        this._initSpreadsheetData();
    }

    _initSpreadsheetConfig() {
        // TODO do perf later
        let rawRange = this.range;
        this.spreadsheetName = rawRange.split('!')[0];
        this.rawSheetRange = rawRange.split('!')[1];
        this.beginCell = this.rawSheetRange.split(':')[0];
        this.endCell = this.rawSheetRange.split(':')[1];

        this.beginCellChar = this.beginCell.slice(0, this.beginCell.search(/\d/));
        this.beginCellNumbs = this.beginCell.replace(this.beginCellChar, '');

        this.endCellChar = this.endCell.slice(0, this.endCell.search(/\d/));
        this.endCellNumbs = this.endCell.replace(this.endCellChar, '');
    }

    _initSpreadsheetData() {
        this.spreadsheet = new Spreadsheet(this);
    }

    get info() {
        return "Spreadsheet: " + this.spreadsheet + " - rawSheetRange: " + this.rawSheetRange + " - spreadsheetName: " + this.spreadsheetName +
            " - beginCell: " + this.beginCell + " - beginCellChar: " + this.beginCellChar + " - beginCellNumbs: " + this.beginCellNumbs +
            " - endCell: " + this.endCell + " - endCellChar: " + this.endCellChar + " - endCellNumbs: " + this.endCellNumbs;
    }

    /**
     * Support only column names: from 'a' to 'z' or 'A' to 'Z'
     */
    static columnRange(beginCellChar, endCellChar) {
        let columnRange = [];
        let supportedColumns = 'abcdefghijklmnopqrstuvwxyz';
        if (beginCellChar === beginCellChar.toUpperCase()) {
            endCellChar = endCellChar.toUpperCase();
            supportedColumns = supportedColumns.toUpperCase();
        }
        supportedColumns = supportedColumns.substring(supportedColumns.indexOf(beginCellChar), supportedColumns.indexOf(endCellChar) + 1);
        columnRange = supportedColumns.split('');
        return columnRange;
    }
}