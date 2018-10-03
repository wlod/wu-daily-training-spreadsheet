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
    
}