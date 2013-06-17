// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.Namespace.define("WinJSDemo.ViewModel.Session", {

        /** Objets bindés*/
        sessionList: new Array(),
        bindedSessionList: new WinJS.Binding.List(),
        bindedSessionGroupedList: new WinJS.Binding.List().createGrouped(),

        /** Fonctions bindées */
        navigateToItemDetail: function (args) {

            var item = WinJSDemo.ViewModel.Session.bindedSessionGroupedList.getAt(args.detail.itemIndex);
            if (item != undefined)
                WinJS.Navigation.navigate("/pages/talkDetail/talkDetail.html", { idTalk: item.id });

        },

        /** Fonctions propres au ViewModel */
        initializeData: function () {

            this.sessionList = WinJSDemo.Data.StaticData.breizhcamp.programme.getAllTalks();

            this.sessionList.forEach(function (talk) {
                WinJSDemo.ViewModel.Session.bindedSessionList.push(talk);
            });

            this.bindedSessionGroupedList = this.bindedSessionList.createGrouped(
                function groupKeySelector(item) { return item.track.type; },
                function groupDataSelector(item) { return item.track; }
            );

            WinJS.Utilities.markSupportedForProcessing(WinJSDemo.ViewModel.Session.navigateToItemDetail);

        },

    });


    //L'initialisation des données doit se faire avant l'initialisation de la page
    WinJSDemo.ViewModel.Session.initializeData();


    WinJS.UI.Pages.define("/pages/session/session.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            WinJS.Binding.processAll(element, WinJSDemo.ViewModel.Session);

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        },

    });


})();
