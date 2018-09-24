"use strict";

class Sheet {
	
	constructor(gCalSheet) {
		this.gCalSheet = gCalSheet;
		
		this._initHeaders();
		this._initData();
		
		this._init();
		
	}
	
	_init() {
        // TODO
        this.dataHeadersMap;
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
                this.headers.push(new SheetHeader(headerValue, 1, i, this.gCalSheet.spreadsheetName));
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
	    this.dataSheetsDataMap = new Map();
	    
	    let sheetRows = this.gCalSheet.result.values;
	    let spreadsheetName = this.gCalSheet.spreadsheetName;
	    // below i = 1 and j = 1 to skip header/row with names and column with dates
	    // using sheetRows[j][0] = date; to add date for each row/header data
	    for (let i = 1; i < this.headers.length; i++) {
	        
	        let sheetHeader = this.headers[i];
	        
	        this.data[sheetHeader.name] = new Array();
	        
	        
	        for(let j = 1; j < sheetRows.length; j++) {
	            
	            let date = sheetRows[j][0];
	            
	            if(typeof this.dataSheetsDataMap.get(date) === "undefined") {
	                this.dataSheetsDataMap.set(date, new Array());
                }
	            
	            let rawDataAsArray = [];
	            for(let k = 0; k < sheetHeader.columns; k++) {
	                rawDataAsArray.push(sheetRows[j][k + sheetHeader.startIndex]);
	            }
	            
	            let sheetData = new SheetData(sheetHeader.name, date, rawDataAsArray, spreadsheetName);
	            
	            this.data[sheetHeader.name].push(sheetData);
	            this.dataSheetsDataMap.get(date).push(sheetData);
	        }
	    }
	    
	}
	
	get dataSheetDate() {
	    return this.dataSheetsDataMap;
	}
	
	 get infoHeaders() {
	      return this.headers;
	 };
	  
	 get infoData() {
	     let infoData = "";
	     for (let key in this.data) {
	         if (this.data.hasOwnProperty(key)) {
	            infoData += this.data[key] + "\n";
	         }
	      }
         return infoData;
     };
}

class SheetData {
	
	constructor(name, date, rawDataAsArray, spreadsheetName) {
		this.name = name;
		this.date = date;
		this.rawDataAsArray = rawDataAsArray;
		this.spreadsheetName = spreadsheetName;
		
		this._initStartTime();
		this._initIcons();
		this._initViewData();
	}
	
	// TODO split 
	_initStartTime() {
	    if(SPREADSHEETS_SUPPORT_START_TIME.includes(this.spreadsheetName)) {
	        this.startTime = null;
	        
	        let startTimeOrDurationColumn = START_TIME_COLUMN[this.spreadsheetName];
	        let startTimeOrDurationRaw = this.rawDataAsArray[startTimeOrDurationColumn];
	        
	        if(typeof startTimeOrDurationRaw === "undefined" ||
	           startTimeOrDurationRaw === SPREADSHEET_CELL_VALUE_EMPTY) {
	            return;
	        }
	        
	        if(SPREADSHEET_TRAINING === this.spreadsheetName && TRAINING_HEADER_INFORMATION_COLUMNS === this.name) {
	            return;
	        }
	        
	        if(SPREADSHEET_TRAINING === this.spreadsheetName) {
	            startTimeOrDurationRaw = startTimeOrDurationRaw.split("-")[0];
	        }
	        
	        // remove weight marker 'b' from pool
	        this.startTime = startTimeOrDurationRaw.replace('b','');
	    }
	}
	
	_initIcons() {
	    this.itemTitleIcon = ICONS[this.name];
	    if(typeof this.itemTitleIcon === "undefined") {
	        this.itemTitleIcon = DEFAULT_ICON;  
	    }
	}
	
	// TODO split
	_initViewData() {
	    this.viewData = new Object();
	    
	    if(COLUMNS_TO_SHOW_NAME_IN_DETAILS.includes(this.name)) {
	        this.viewData['name'] = this.name;
	    }
	    
	    if(typeof this.rawDataAsArray === "undefined" || this.rawDataAsArray === null) {
	        console.log(this.rawDataAsArray);
	        return;
	    }
	    
	    let skipColumns = new Array();
	    
	    if(SPREADSHEETS_SUPPORT_START_TIME.includes(this.spreadsheetName)) {
	        let startTimeOrDurationColumn = START_TIME_COLUMN[this.spreadsheetName];
	        let startTimeOrDurationRaw = this.rawDataAsArray[startTimeOrDurationColumn];
	        if(SPREADSHEET_TRAINING === this.spreadsheetName && startTimeOrDurationRaw !== SPREADSHEET_CELL_VALUE_EMPTY) {
	            // TODO move value "duration" to confView
	            this.viewData["duration"] = startTimeOrDurationRaw;
             }
	        skipColumns.push(startTimeOrDurationColumn);
        }
	    
	    // TODO move hmm to confView
	    if(SPREADSHEET_WEIGHT === this.spreadsheetName) {
	        this.viewData["weight"] = this.rawDataAsArray[0];
	        skipColumns.push(0);
	    }
	    
            
	    let labelNames = LABELS_OTHERS[this.name];
        for(let i = 0; i < this.rawDataAsArray.length; i++) {
            if(skipColumns.indexOf(i) !== -1) {
                continue;
            }
            if(typeof this.rawDataAsArray[i] === 'undefined' || SPREADSHEET_CELL_VALUE_EMPTY === this.rawDataAsArray[i]) {
                continue;
            }
            
            let multiData = this.rawDataAsArray[i].split('\n');
            for(let j = 0; j < multiData.length; j++) {
                let labelName = DEFAULT_LABEL + i + "(" + j + ")";
                if(typeof labelNames !== "undefined" && typeof labelNames[j] !== "undefined") {
                    labelName = labelNames[j];
                }
                this.viewData[labelName] = multiData[j];
            }
        }
	    
	}
	
	toString() {
        return "SheetData: [name: " + this.name + ", date: " + this.date + ", rawDataAsArray: " + this.rawDataAsArray + ", spreadsheetName: " + this.spreadsheetName + ", itemTitleIcon: " + this.itemTitleIcon + "]";
    }
	
}

class SheetHeader {
    
    constructor(name, columns, startIndex, spreadsheetName) {
        this.name = name;
        this.columns = columns;
        this.startIndex = startIndex;
        this.spreadsheetName = spreadsheetName;
    }
    
    toString() {
        return "DateSheetHeader: [name: " + this.name + ", columns: " + this.columns + ", startIndex: " + this.startIndex + ", spreadsheetName: " + this.spreadsheetName + "]";
    }
    
}