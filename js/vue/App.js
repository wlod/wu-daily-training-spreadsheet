class App {

    constructor(gApiSheetProvider) {
        this.gApiSheetProvider = gApiSheetProvider;
        
        this._renderView();
        
    }
    
    _renderView() {
        
        new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue!'
            }
      })
    }
}


