"use strict";

class DateSheet {
	
	constructor(gCalSheet) {
		this.gCalSheet = gCalSheet;
		
		this._initHeaders();
		this._initData();
		
		this._init();
		
	}
	
	_init() {
        // TODO
        this.dates;
        this.dataHeadersMap;
        this.dataDatesMap;
        
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
                this.headers.push(new SheetHeader(headerValue, 1, i));
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
	
	_initData() {
	    this.data = new Object();
	    
	    
	    let sheetRows = this.gCalSheet.result.values;
	    // below i = 1 and j = 1 to skip header/row with names and column with dates
	    // using sheetRows[j][0] = date; to add date for each row/header data
	    for (let i = 1; i < this.headers.length; i++) {
	        
	        let sheetHeader = this.headers[i];
	        
	        this.data[sheetHeader.name] = new Array();
	        
	        for(let j = 1; j < sheetRows.length; j++) {
	            
	            let rawData = "";
	            for(let k = 0; k < sheetHeader.columns; k++) {
	                
	                rawData += sheetRows[j][k + sheetHeader.startIndex] + SPREADSHEET_CELL_VALUE_DELIMITER;
	            }
	            
	            this.data[sheetHeader.name].push(new SheetData(sheetHeader.name, sheetRows[j][0], rawData));
	            
	        }
	    }
	    
	}
	
	 get infoHeaders() {
	      return this.headers;
	 };
	  
	 get infoData() {
	     let infoData = "";
	     for (var key in this.data) {
	         if (this.data.hasOwnProperty(key)) {
	            infoData += this.data[key] + "\n";
	         }
	      }
         return infoData;
     };
}

class SheetData {
	
	constructor(name, date, rawColumnsData) {
		this.name = name;
		this.date = date;
		this.rawColumnsData = rawColumnsData;
	}
	
	toString() {
        return "SheetData: [name: " + this.name + ", date: " + this.date + ", rawColumnsData: " + this.rawColumnsData + "]";
    }
	
}

class SheetHeader {
    
    constructor(name, columns, startIndex) {
        this.name = name;
        this.columns = columns;
        this.startIndex = startIndex;
    }
    
    toString() {
        return "DateSheetHeader: [name: " + this.name + ", columns: " + this.columns + ", startIndex: " + this.startIndex + "]";
    }
    
}