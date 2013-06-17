(function () {
    "use strict";

    WinJS.Namespace.define("WinJSDemo.Model.BusinessObject", {

        Breizhcamp: WinJS.Class.define(
            function (titre, programme) { 
                this.titre = titre;
                if (programme != null) {
                    this.programme = new WinJSDemo.Model.BusinessObject.Programme(programme.jours);
                } 
            },
            { 
                titre: "",
                programme: "",

                loadData: function () {

                    // Oui en C#
                    // var michel = WinJSDemo.Data.DataService.getBreizhcampProgramAsync();
                    // WinJSDemo.Data.StaticData.breizhcamp.createProgram(michel);

                    WinJSDemo.Data.DataService.getBreizhcampProgramAsync().then(function retourGetProgrem(breizhcamp) {

                        /** Ne fonctionne pas car la fonction appelé est anonyme et ne fait pas partie de l'objet courant */
                        //this.createProgram(breizhcamp);

                        WinJSDemo.Data.StaticData.breizhcamp.createProgram(breizhcamp);

                    }, function (error) {
                        new Windows.UI.Popups.MessageDialog("Il y a eu une erreur lors du chargement des données de l'application. Cause de l'erreur : " + error, "Erreur").showAsync();
                    });

                },

                createProgram: function (breizhcamp) {

                    this.titre = breizhcamp.titre;
                    this.programme = new WinJSDemo.Model.BusinessObject.Programme(breizhcamp.programme.jours);

                }

            },
            { 
            }
            ),


        Programme: WinJS.Class.define(
            function (jours) { 
                this.jours = new Array();
                for (var i = 0; i < jours.length; i++) {
                    this.jours.push(new WinJSDemo.Model.BusinessObject.Jour(
                        jours[i].title,
                        jours[i].date,
                        jours[i].tracks));
                };
            },
            {

                getAllTalks: function () {

                    var talks = new Array();

                    this.jours.forEach(function (jour) {

                        jour.tracks.forEach(function (track) {

                            track.talks.forEach(function (talkToInsert) {

                                talks.push(talkToInsert);

                            });

                        });

                    });

                    return talks;

                },


                getTalkByID: function (idTalk) {
                    
                    var talkToReturn;

                    this.jours.forEach(function (jour) {

                        jour.tracks.forEach(function (track) {

                            track.talks.forEach(function (talk) {

                                if (talk.id == idTalk) {
                                    talkToReturn = talk;
                                }

                            });

                        });

                    });

                    return talkToReturn;

                }

            },
            { 
            }
        ),

        Jour: WinJS.Class.define(
            function (title, date, tracks) { 
                this.title = title;
                this.date = date;
                this.tracks = new Array();
                for (var i = 0; i < tracks.length; i++) {
                    this.tracks.push(new WinJSDemo.Model.BusinessObject.Track(
                        tracks[i].type,
                        tracks[i].talks,
                        this));
                }
            },
            { 
                title: "",
                date: ""
            },
            { 
            }
        ),

        Track: WinJS.Class.define(
            function (type, talks, jour) {
                this.type = type;
                this.jour = jour;
                this.talks = new Array();
                for (var i = 0; i < talks.length; i++) {
                    this.talks.push(new WinJSDemo.Model.BusinessObject.Talk(
                        talks[i].id,
                        talks[i].title,
                        talks[i].description,
                        talks[i].time,
                        talks[i].format,
                        talks[i].url,
                        talks[i].room,
                        talks[i].speakers,
                        this));
                }
            },
            { 
                type: ""
            },
            { 
            }
        ),

        Talk: WinJS.Class.define(
            function (id, title, description, time, format, url, room, speakers, track) { 
                this.id = id;
                this.title = title;
                this.description = description;
                this.time = time;
                this.format = format;
                this.url = url;
                this.room = room;
                this.track = track;
                this.speakers = new Array();
                for (var i = 0; i < speakers.length; i++) {
                    this.speakers.push(new WinJSDemo.Model.BusinessObject.Speaker(
                        speakers[i].id,
                        speakers[i].fullname,
                        speakers[i].avatar,
                        speakers[i].description,
                        speakers[i].liens,
                        this));
                }
            },
            { 
                id: "",
                title: "",
                description: "",
                time: "",
                format: "",
                url: "",
                room: "",

            },
            { 
            }
        ),

        Speaker: WinJS.Class.define(
            function (id, fullname, avatar, description, liens, talk) { 
                this.id = id;
                this.fullname = fullname;
                this.avatar = avatar;
                this.description = description;
                this.talk = talk;
                if (liens != null) {
                    this.liens = new Array();
                    for (var i = 0; i < liens.length; i++) {
                        this.liens.push(liens[i]);
                    }
                }
            },
            { 
                type: "",
                id:"",
                fullname: "",
                avatarLink: "",
                description: ""
            },
            { 
            }
        )

    }); // fin namespace dataModel


}());