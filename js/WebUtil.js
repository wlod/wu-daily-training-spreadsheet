"use strict";

class WebUtil {
    
    /**
     * Below is simple and ugly solution for RWD
     */
    static updateItemHeight() {
        return new Promise( (resolve, reject) => {
            document.querySelectorAll('div.item-list').forEach( (itemList) => {
                let maxHeight = 0;
                itemList.querySelectorAll('div.item > div.item-content').forEach( (itemContent) => {
                   if(maxHeight < itemContent.clientHeight) {
                        maxHeight = itemContent.clientHeight;
                    }
                });
                itemList.querySelectorAll('div.item > div.item-content').forEach( (itemContent) => {
                    itemContent.style.height = maxHeight + "px";
                });
            });
        });
    }
    
    /**
     * Append Views library to each image with '.image-trigger' selector
     */
    static appendViewsToImage() {
        return new Promise( (resolve, reject) => {
            var views = [];
            var triggers = document.querySelectorAll('.image-trigger');
            [].forEach.call(triggers, function(element, index) {
                views[index] = new Views(element, {
                    defaultTheme: true,
                    prefix: 'light',
                    loader: 'Loading...',
                    anywhereToClose: true,
                    openAnimationDuration: 400,
                    closeAnimationDuration: 400
                });
            });
        });
    }
    
}