"use strict";

class WebUtil {
    
    /**
     * Below is simple and ugly solution for RWD
     */
    static updateItemHeight() {
        return new Promise( (resolve, reject) => {
            document.querySelectorAll('ul.item-list').forEach( (itemList) => {
                const itemsContent = itemList.querySelectorAll('li.item > div.item-content');
                let maxHeight = 0;
                
                itemsContent.forEach( (itemContent) => {
                   if(maxHeight < itemContent.clientHeight) {
                        maxHeight = itemContent.clientHeight;
                    }
                });
                itemsContent.forEach( (itemContent) => {
                    itemContent.style.height = maxHeight + "px";
                });
            });
        });
    }
    
    /**
     * Append Views library to each images with '.image-trigger' selector
     */
    static appendViewsToImage() {
        return new Promise( (resolve, reject) => {
            const triggers = document.querySelectorAll('.image-trigger');
            triggers.forEach( (img) => {
                new Views(img, {
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