// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.Namespace.define("WinJSDemo.ViewModel.DetailTalk", {

        bindedTalk: "",
        bindedSpeakers: new WinJS.Binding.List(),

        initializeData: function (idTalk) {

            if (idTalk != undefined) {
                WinJSDemo.ViewModel.DetailTalk.bindedTalk = WinJSDemo.ViewModel.DetailTalk._getTalkByID(idTalk);
            
                //vider la liste lors qu'on revient sur la page
                if (WinJSDemo.ViewModel.DetailTalk.bindedSpeakers.length != 0) {
                    WinJSDemo.ViewModel.DetailTalk.bindedSpeakers.length = 0;
                }

                WinJSDemo.ViewModel.DetailTalk.bindedTalk.speakers.forEach(function (speaker) {
                    WinJSDemo.ViewModel.DetailTalk.bindedSpeakers.push(speaker);
                });
            };

        },

        _getTalkByID: function (idTalk) {
            return WinJSDemo.Data.StaticData.breizhcamp.programme.getTalkByID(idTalk);
        },

        textConverter: WinJS.Binding.converter(function (text) {
            if (text == null) {
                return "Pas de description";
            } else {
                return text;
            }
        })

    });


    WinJS.UI.Pages.define("/pages/talkDetail/talkDetail.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            //récupération de l'id envoyé en paramètre
            var idTalk = options.idTalk;

            WinJSDemo.ViewModel.DetailTalk.initializeData(idTalk);

            WinJS.Binding.processAll(element, WinJSDemo.ViewModel.DetailTalk);

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });
})();
