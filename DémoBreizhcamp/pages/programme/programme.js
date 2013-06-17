// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.Namespace.define("WinJSDemo.ViewModel.Programme", {

        /** Objets bindés*/
        talks: new Array(),
        bindedTalks: new WinJS.Binding.List(),
        bindedTalksGrouped: new WinJS.Binding.List().createGrouped(),

        /** Fonctions bindées */
        navigateToItemDetail: function (args) {

            var item = WinJSDemo.ViewModel.Programme.bindedTalksGrouped.getAt(args.detail.itemIndex);
            if(item!=undefined)
                WinJS.Navigation.navigate("/pages/talkDetail/talkDetail.html", { idTalk: item.id });
            
        },

        /** Fonctions propres au ViewModel */
        initializeData: function () {

            this.talks = WinJSDemo.Data.StaticData.breizhcamp.programme.getAllTalks();

            this.talks.forEach(function (talk) {
                WinJSDemo.ViewModel.Programme.bindedTalks.push(talk);
            });

            this.bindedTalksGrouped = this.bindedTalks.createGrouped(
                function groupKeySelector(item) { return item.track.jour.date + item.time; },
                function groupDataSelector(item) { return item; }
            );

            WinJS.Utilities.markSupportedForProcessing(WinJSDemo.ViewModel.Programme.navigateToItemDetail);

        },

        // converter
        dateConverter: WinJS.Binding.converter(function (date) {
            switch (date) {
                case "13/06/2013":
                    return "jeu. 13";
                    break;
                case "14/06/2013":
                    return "ven. 14";
                    break;
                default:
                    return "noël 25";
                    break;
            }
        }),

        dateConverterShort: WinJS.Binding.converter(function (date) {
            switch (date) {
                case "13/06/2013":
                    return "jeu";
                    break;
                case "14/06/2013":
                    return "ven";
                    break;
                default:
                    return "noël";
                    break;
            }
        })

    });


    WinJSDemo.ViewModel.Programme.initializeData();


    WinJS.UI.Pages.define("/pages/programme/programme.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            
            var listView = element.querySelector(".programmelist").winControl;
            listView.groupHeaderTemplate = element.querySelector(".headertemplate");
            listView.itemTemplate = element.querySelector(".itemtemplate");
            listView.oniteminvoked = WinJSDemo.ViewModel.Programme.navigateToItemDetail;

            var zoomedOutListView = element.querySelector(".zoomedOutListView").winControl;
            zoomedOutListView.itemTemplate = element.querySelector(".semanticZoomTemplate");

            this._initializeLayout(listView, zoomedOutListView, Windows.UI.ViewManagement.ApplicationView.value);
            
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            var listView = element.querySelector(".programmelist").winControl;
            var zoomedOutListView = element.querySelector(".zoomedOutListView").winControl;
            if (lastViewState !== viewState) {
                if (lastViewState === Windows.UI.ViewManagement.ApplicationViewState.snapped || viewState === Windows.UI.ViewManagement.ApplicationViewState.snapped) {
                    var handler = function (e) {
                        listView.removeEventListener("contentanimating", handler, false);
                        zoomedOutListView.removeEventListener("contentanimating", handler, false);
                        e.preventDefault();
                    }
                    listView.addEventListener("contentanimating", handler, false);
                    zoomedOutListView.addEventListener("contentanimating", handler, false);
                    this._initializeLayout(listView, zoomedOutListView, viewState);
                }
            }

        },


        // This function updates the ListView with new layouts
        _initializeLayout: function (listView, zoomedOutListView, viewState) {

            if (viewState == Windows.UI.ViewManagement.ApplicationViewState.snapped) {

                listView.itemDataSource = WinJSDemo.ViewModel.Programme.bindedTalksGrouped.dataSource;
                listView.groupDataSource = WinJSDemo.ViewModel.Programme.bindedTalksGrouped.groups.dataSource;
                listView.layout = new WinJS.UI.ListLayout();

                zoomedOutListView.itemDataSource = WinJSDemo.ViewModel.Programme.bindedTalksGrouped.groups.dataSource;;
                zoomedOutListView.layout = new WinJS.UI.ListLayout();

            } else {

                listView.itemDataSource = WinJSDemo.ViewModel.Programme.bindedTalksGrouped.dataSource;
                listView.groupDataSource = WinJSDemo.ViewModel.Programme.bindedTalksGrouped.groups.dataSource;
                listView.layout = new WinJS.UI.GridLayout({ groupHeaderPosition: "left" });

                zoomedOutListView.itemDataSource = WinJSDemo.ViewModel.Programme.bindedTalksGrouped.groups.dataSource;
                zoomedOutListView.layout = new WinJS.UI.GridLayout();

            }
        }

    });

})();
