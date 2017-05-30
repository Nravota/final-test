/*globals document, window, $ */


(function () {
    "use strict";
    
    var kids = [];

    var TEMPLATE = "" +
        
        "        <div class=\"kid\">\n" +
        "          <div class=\"panel panel-info\">\n" +
        "            <div class=\"panel-heading\">\n" +
        "              <h3>NAME</h3>\n" +
        "            </div>\n" +
        "            <div class=\"panel-body\">\n" +
        "              <div class=\"col-sm-4\">\n" +
        "                <img class=\"img-responsive\" src=\"%IMAGE-URL%\">\n" +
        "              </div>\n" +
        "              <div class=\"col-sm-8\">\n" +
        "                <ul>\n" +
        "                  <li><h5>Години: %AGE%</h5></li>\n" +
        "                  <li><h5>%COLOR%</h5></li>\n" +
        "                  <li><h5>%GAME%</h5></li>\n" +
        "                  <li><h5>%ICECREAM%</h5></li>\n" +
        "                </ul>\n" +
        "              </div>\n" +
        "            </div>\n" +
        "          </div>\n" +
        "        </div>\n";
    
    $.getJSON("./js/kids.json", function (data) {
        kids = data;
        displayKids(kids);
    });
        
    function displayKids(list) {
        var collection = document.querySelector("#kids");
        collection.innerHTML = "";

        list.forEach(function (kid) {
            var html = TEMPLATE
            .replace("NAME", kid.name)
            .replace("%AGE%", kid.age)
            .replace("%COLOR%", kid.color)
            .replace("%GAME%", kid.game)
            .replace("%ICECREAM%", kid.food)
            .replace("%IMAGE-URL%", kid.image);
            var div = document.createElement("div");
            div.className = "col-md-6";
            div.innerHTML = html;
            collection.appendChild(div);
        });
    }
    
    
    $(".form-control").on("keyup", function (event) {
        var value = event.target.value.toLocaleLowerCase();
        if (value.length > 2) {
            var filtered = kids.filter(function (kid) {
                return (kid.name+" "+kid.age).toLocaleLowerCase().indexOf(value) > -1;
            });
            displayKids(filtered);
        }
        else {
            displayKids(kids);
        }
    });
    
        
})();