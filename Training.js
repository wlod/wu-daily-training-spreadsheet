"use strict";

class Training {
	
	constructor(gCalSheet) {
		this.gCalSheet = gCalSheet;
		
		this._init();
		this._initHeaders()
	}
	
	_init() {
        
        this.dates;
        this.trainingDataHeadersMap;
        this.trainingDataDatesMap;
        
    }
	
	_initHeaders() {
	    this.headers = [];
        let headerRow = this.gCalSheet.result.values[0];

        let currentHeaderIndex = -1;
        let i = 0;
        for (; i < headerRow.length; i++) {
            let headerValue = headerRow[i];
            if(typeof headerValue !== "undefined" && headerValue.length > 0) {
                currentHeaderIndex++;
                this.headers.push(new TrainingHeader(headerValue, 1));
                continue;
            }
            if(typeof currentHeaderIndex !== "undefined" ) {
                this.headers[currentHeaderIndex].columns++;
                continue;
            }
        }
        
        if(GCalSheet.columnRange(this.gCalSheet.beginCellChar, this.gCalSheet.endCellChar).length > i) {
            this.headers[currentHeaderIndex].columns += GCalSheet.columnRange(this.gCalSheet.beginCellChar, this.gCalSheet.endCellChar).length - i;
        }
        
	}
	
	 get infoHeaders() {
	      return this.headers;
	  };
	
}

class TrainingData {
	
	constructor(name, date, rawColumns) {
		this.name = name;
		this.date = date;
		this.rawColumns = rawColumns;
	}
	
}

class TrainingHeader {
    
    constructor(name, columns) {
        this.name = name;
        this.columns = columns;
    }
    
    toString() {
        return "TrainingHeader: [name: " + this.name + ", columns: " + this.columns + "]";
    }
    
}