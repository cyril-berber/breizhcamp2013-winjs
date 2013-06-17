(function () {
    "use strict";

    WinJS.Namespace.define("WinJSDemo.ViewModel.Home", {

        /** Objets bindés*/
        menuList: [
            { linkName: "session", backgroundColor: "orange", label: "Les sessions par thème" },
            { linkName: "programme", backgroundColor: "violet", label: "Programme complet"}
        ],

        bindedMenuList: new WinJS.Binding.List(),

        /** Fonctions bindées */
        navigateTo: function (args) {
            var itemIndex = args.detail.itemIndex;
            var link = WinJSDemo.ViewModel.Home._linkConverter(WinJSDemo.ViewModel.Home.menuList[itemIndex].linkName)
            WinJS.Navigation.navigate(link);
        },

        /** Fonctions propres au ViewModel */
        initializePage: function () {

            // pour rendre la méthode safe
            WinJS.Utilities.markSupportedForProcessing(WinJSDemo.ViewModel.Home.navigateTo);

            WinJSDemo.ViewModel.Home.menuList.forEach(function(item){
                WinJSDemo.ViewModel.Home.bindedMenuList.push(item);
            });

        },

        _linkConverter: function(linkName) {
            return "/pages/" + linkName + "/" + linkName + ".html";
        },


        /** Converters */
        colorConverter: WinJS.Binding.converter(function (color) {
            switch (color)
            {
                case "orange":
                    return "#C24A16";
                    break;
                case "violet":
                    return "#68036A";
                    break;
                default:
                    return "#000000";
                    break;
            }
        })
    
    });
    

    WinJSDemo.ViewModel.Home.initializePage();


    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            WinJS.Binding.processAll(element, WinJSDemo.ViewModel.Home);

        }

    });


})();