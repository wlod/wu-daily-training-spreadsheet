"use strict";

class GCalSpreadsheetLink {
	
   // TODO It should be used GCalSpreadsheet - but configuration to parsing is providing by each spreadsheet.
   // For now - spreadsheet with links to training spreadsheet doesn't contains any configuration.
   // The final name: SpreadsheetLink
	constructor(resultRow) {
		this.resultRow = resultRow;
		this._initData();
	}
	
	_initData() {
	    this.data = new Object();
	    this.data["label"] = this.resultRow[0];
	    this.data["startDate"] = this.resultRow[1];
	    this.data["endDate"] = this.resultRow[2];
	    this.data["id"] = this.resultRow[3];
	    this.data["publicLink"] = this.resultRow[4];
	    this.data["isSelected"] = false;
	}

}