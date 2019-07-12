class ExtViews {

    /**
     * Add js files to end of head tag in index.hml
     * Append Views library to each images with '.image-trigger' selector
     * Append navigation to Views library by viewer.on('open'... and viewer.on('close',...
     */
    static appendViewsToImage() {
        return new Promise((resolve, reject) => {

            WebUtil.appendScriptToDOM('js/vendors/lazysizes.min.js');
            WebUtil.appendScriptToDOM('js/vendors/ls.attrchange.min.js');

            const triggers = document.querySelectorAll('.image-trigger');
            triggers.forEach((img, index) => {
                const viewer = new Views(img, {
                    defaultTheme: true,
                    prefix: 'ext',
                    loader: '<img src="assets/loader-2.gif" class="ext-views-loader"/>',
                    anywhereToClose: true,
                    openAnimationDuration: 0,
                    closeAnimationDuration: 0
                });
                viewer.on('open', () => {
                    WebUtil.waitForDomElement('#ext-views-wrapper > div.ext-views-content', 40, (element) => {

                        ExtViews.createDescription(triggers[index])

                        const nextImageDom = triggers[index + 1];
                        const prevImageDom = triggers[index - 1];

                        const prevNavigation = ExtViews.createNavigation(viewer, "Prev", element, prevImageDom, "ext-views-navigation-prev");
                        const nextNavigation = ExtViews.createNavigation(viewer, "Next", element, nextImageDom, "ext-views-navigation-next");

                        // TODO for now "document.onkeydown" is only used in this place
                        document.onkeydown = function (e) {
                            if (e.key  === 'ArrowLeft' && typeof prevNavigation !== "undefined") {
                                prevNavigation !== prevNavigation.click();
                            }
                            if (e.key  === 'ArrowRight' && typeof nextNavigation !== "undefined") {
                                nextNavigation.click();
                            }
                        }

                    });
                });
            });
        });
    }

    static createNavigation(viewer, label, parent, imageDom, clazz) {
        if (typeof imageDom !== "undefined" && imageDom !== null) {
            const container = document.createElement("div");
            container.setAttribute("class", "ext-views-navigation " + clazz);
            container.addEventListener("click", () => {
                viewer.close();
                imageDom.click();
            });

            const textNodeLabelContainer = document.createElement("span");
            const textNodeLabel = document.createTextNode(label);
            textNodeLabelContainer.append(textNodeLabel);
            container.appendChild(textNodeLabelContainer);

            parent.appendChild(container);

            return container;
        }
    }

    static createDescription(sourceImageDom) {
        if (typeof sourceImageDom === "undefined" || sourceImageDom == null) {
            return;
        }

        const imageContainer = document.querySelector("#ext-views-wrapper > div.ext-views-content");
        if (typeof imageContainer === "undefined" || imageContainer == null) {
            return;
        }

        imageContainer.setAttribute("data-image-description", sourceImageDom.firstChild.getAttribute("data-image-description"));
    }

}