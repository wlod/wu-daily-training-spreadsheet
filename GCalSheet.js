class GCalSheet {
  constructor(range, result) {
    this.range = range;
    this.result = result;
    this._initSheetConfig();
    this._initSheetData();
  }
  
  _initSheetConfig() {
	  // TODO do perf later
	  let rawRange  = this.range;
	  this.sheet =  rawRange.split('!')[0];
	  this.rawSheetRange = rawRange.split('!')[1];
	  this.beginCell = this.rawSheetRange.split(':')[0];
	  this.endCell = this.rawSheetRange.split(':')[1];
	  
	  this.beginCellChar = this.beginCell.slice(0, this.beginCell.search(/\d/));
	  this.beginCellNumbs = this.beginCell.replace(this.beginCellChar, '');
	  
	  this.endCellChar = this.endCell.slice(0, this.endCell.search(/\d/));
	  this.endCellNumbs = this.endCell.replace(this.endCellChar, '');
  }
  
  _initSheetData() {
	  // TODO dodac nazwe implementacji do roznych dedykowanych arkuszy; moze
        // prototype
	  this.training = new Training(this);
  }
  
  get dataPrint() {
	  let range = this.result;
	  if (range.values.length > 0) {
          console.log("range.values.length: " + range.values.length);
          for (let i = 0; i < range.values.length; i++) {
            let row = range.values[i];
            let rowAsString = "";
            for (let j = 0; j < row.length; j++) {
            	rowAsString += row[j] + ', ';
            }
            appendPre(rowAsString);
          }
        } else {
          appendPre('No data found.');
        }
  }
  
  get info() {
	  return "sheet: " + this.sheet + " - rawSheetRange: " + this.rawSheetRange + 
		" - beginCell: " + this.beginCell + " - beginCellChar: " + this.beginCellChar + " - beginCellNumbs: " + this.beginCellNumbs + 
		" - endCell: " + this.endCell + " - endCellChar: " + this.endCellChar + " - endCellNumbs: " + this.endCellNumbs;
  }
  
  /**
   * Support only column names: from 'a' to 'z' or 'A' to 'Z'
   */
  static columnRange(beginCellChar, endCellChar) {
      let columnRange = [];
      let supportedColumns = 'abcdefghijklmnopqrstuvwxyz';
      if(beginCellChar === beginCellChar.toUpperCase()){
          endCellChar = endCellChar.toUpperCase();
          supportedColumns = supportedColumns.toUpperCase();
      }
      supportedColumns = supportedColumns.substring(supportedColumns.indexOf(beginCellChar), supportedColumns.indexOf(endCellChar) + 1);
      columnRange = supportedColumns.split('');        
      return columnRange;
  }
}