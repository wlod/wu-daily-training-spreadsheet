class ExtViews {

    /**
     * Add js files to end of head tag in index.hml
     * Append Views library to each images with '.image-trigger' selector
     * Append navigation to Views library by viewer.on('open'... and viewer.on('close',...
     */
    // TODO move 'copy' to configuration
    static appendViewsToImage() {
        return new Promise((resolve, reject) => {

            WebUtil.appendScriptToDOM('js/vendors/lazysizes.min.js');
            WebUtil.appendScriptToDOM('js/vendors/ls.attrchange.min.js');

            const triggers = document.querySelectorAll('.image-trigger');
            triggers.forEach((img, index) => {
                const viewer = new Views(img, {
                    defaultTheme: true,
                    prefix: 'wu-images',
                    loader: 'Loading...',
                    anywhereToClose: true,
                    openAnimationDuration: 0,
                    closeAnimationDuration: 0
                });
                viewer.on('open', () => {
                    WebUtil.waitForDomElement('#wu-images-views-wrapper > div.wu-images-views-content', 40, (element) => {

                        const nextImageDom = triggers[index + 1];
                        const prevImageDom = triggers[index - 1];

                        const prevNavigation = ExtViews.createNavigation(viewer, "Prev", element, prevImageDom, "left: 10%");
                        const nextNavigation = ExtViews.createNavigation(viewer, "Next", element, nextImageDom, "right: 10%");

                        // TODO for now "document.onkeydown" is only used in this place
                        document.onkeydown = function (e) {
                            if (e.keyCode === 37 && typeof prevNavigation !== "undefined") {
                                prevNavigation !== prevNavigation.click();
                            }
                            if (e.keyCode === 39 && typeof nextNavigation !== "undefined") {
                                nextNavigation.click();
                            }
                        }

                    });
                });
            });
        });
    }


    static createNavigation(viewer, label, parent, imageDom, position) {
        if (typeof imageDom !== "undefined" && imageDom !== null) {
            const container = document.createElement("div");
            container.setAttribute("id", "wu-images-views-next");
            container.setAttribute("style", "z-index: 10090 !important; width: 24px; height: 24px; position: absolute; top: 45%; color: #FFF; " + position);
            container.addEventListener("click", () => {
                viewer.close();
                imageDom.click();
            });

            const textNodeLabel = document.createTextNode(label);
            container.appendChild(textNodeLabel);

            parent.appendChild(container);

            return container;
        }
    }

}