(function () {
    "use strict";

    WinJS.Namespace.define("WinJSDemo.Utils", {

        // converters
        dateConverterLong: WinJS.Binding.converter(function (date) {
            switch (date) {
                case "13/06/2013":
                    return "jeudi 13 juin";
                    break;
                case "14/06/2013":
                    return "vendredi 14 juin";
                    break;
                default:
                    return "noël 25";
                    break;
            }
        }),

        colorConverter: WinJS.Binding.converter(function (type) {
            switch (type) {
                case "agilité":
                    return "#C24A16";
                    break;
                case "cloud et architecture":
                    return "#68036A";
                    break;
                case "cloud et bigdata":
                    return "#D8C700";
                    break;
                case "devops":
                    return "#88887F";
                    break;
                case "découverte":
                    return "#AC5F3F";
                    break;
                case "eXtreme":
                    return "#8C3609";
                    break;
                case "keynote":
                    return "#964199";
                    break;
                case "langages":
                    return "#555658";
                    break;
                case "tooling":
                    return "#8D6792";
                    break;
                case "web":
                    return "#9D9400";
                    break;
                case "web et mobile":
                    return "#87855A";
                    break;
                default:
                    return "#000000";
                    break;
            }
        })

    });

})();