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
    
    
    static removeImageLoading() {
        return new Promise( (resolve, reject) => {
            const imgages = document.querySelectorAll("img.item-image");
            imgages.forEach( (img) => {
                img.addEventListener("load", function(git) {
                    // remove loading img
                    img.nextSibling.remove();
                });
            });
        });
    }

    
}