(function () {
    "use strict";

    WinJS.Namespace.define("WinJSDemo.Data.DataService", {

        getBreizhcampProgramAsync: function () {

            // création d'une promise, pas besoin mais démo :  
            //var promise = new WinJS.Promise(function (complete, error, progress) {

            //    //WinJSDemo.Data.DataService._generateDataFromRestService().then(function (resultBreizhcamp) {
            //    WinJSDemo.Data.DataService._generateDataFromLocalJSONAsync().then(function (resultBreizhcamp) {

            //        if (resultBreizhcamp.titre == undefined) {
            //            error(resultBreizhcamp);
            //        } else {
            //            complete(resultBreizhcamp);
            //        }
                    
            //    });

            //});

            //return promise;

            
            return this._generateDataFromLocalJSONAsync().then(function(resultBreizhcamp){
                return resultBreizhcamp;
            });

        },

        // pour les besoins de la conférence : accès d'un fichier en local
        _generateDataFromLocalJSONAsync: function(){

            var localeFileName = "breizhcamp.txt";
            var localFolder = Windows.ApplicationModel.Package.current.installedLocation;
            var encoding = Windows.Storage.Streams.UnicodeEncoding.utf8;

            return localFolder.getFileAsync(localeFileName).then(function (file) {

                return Windows.Storage.FileIO.readTextAsync(file, encoding).then(function (text) {

                    return WinJSDemo.Data.DataService._parseJSON(text);

                });

            }, function (error) {
                return error.message;
            });

        },


        // obtention du JSON depuis webservice hébergé sur wampserver
        _generateDataFromRestService: function () {

            WinJS.xhr({
                url: "http://toto.com/okcestcool"
            }).then(function (data) {

                var json = JSON.parse(data.responseText);

                for (var n = 0; n < json.length; n++) {

                    for (var i = 0; i < json[n].ligne.length; i++) {

                        var ligne = {};

                        ligne.numLigne = json[n].ligne[i].numLigne;
                        ligne.arret = json[n].libelle;
                        ligne.image = "images/Lignes/" + ligne.numLigne + ".gif";
                        ligne.codeLieu = json[n].codeLieu;

                        ligneList.push(ligne);

                    }

                }

                groupedItemsList = ligneList.createGrouped(getGroupKey, getGroupData, compareGroups);

            }, function (error) {
                var message = new Windows.UI.Popups.MessageDialog(error.message, "erreur");
                message.showAsync();
            });
        },


        _parseJSON: function (text) {

            return JSON.parse(text);

        }

    }); // fin namespace serviceModel


}());