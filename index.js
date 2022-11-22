var apikey = "c2fce884";

// Enable user to start searching immediately after page has loaded without having to click on anything
window.onload = document.getElementById("cinema").select();

var theatreID;
var searchWord;

// Placing contents to h1
var date = new Date();
var day = date.getDate();
if (day < 10) {
    day = "0" + day;
}
var month = (date.getMonth() + 1);
if (month < 10) {
    month = "0" + month;
}
var year = date.getFullYear();
date = day + "." + month + "." + year;
document.getElementById("heading").innerHTML = "Finnkino-elokuvateattereiden tarjonta<br>" + date;

// When user has already used the search field and wants to use the drop-down menu, the search field is emptied to avoid confusion
document.getElementById("cinema").addEventListener("click", function () {
    document.getElementById("search").value = "";
});

// When user has chosen an area or cinema from the drop-down menu, start loading XML
function showMovies() {
    document.getElementById("cinema").select();
    switch (document.getElementById("cinema").value) {
        case "Pääkaupunkiseutu":
            theatreID = 1014;
            break;
        case "Espoo":
            theatreID = 1012;
            break;
        case "Espoo: OMENA":
            theatreID = 1039;
            break;
        case "Espoo: SELLO":
            theatreID = 1038;
            break;
        case "Helsinki":
            theatreID = 1002;
            break;
        case "Helsinki: ITIS":
            theatreID = 1045;
            break;
        case "Helsinki: KINOPALATSI":
            theatreID = 1031;
            break;
        case "Helsinki: MAXIM":
            theatreID = 1032;
            break;
        case "Helsinki: TENNISPALATSI":
            theatreID = 1033;
            break;
        case "Vantaa: FLAMINGO":
            theatreID = 1013;
            break;
        case "Jyväskylä: FANTASIA":
            theatreID = 1015;
            break;
        case "Kuopio: SCALA":
            theatreID = 1016;
            break;
        case "Lahti: KUVAPALATSI":
            theatreID = 1017;
            break;
        case "Lappeenranta: STRAND":
            theatreID = 1041;
            break;
        case "Oulu: PLAZA":
            theatreID = 1018;
            break;
        case "Pori: PROMENADI":
            theatreID = 1019;
            break;
        case "Tampere":
            theatreID = 1021;
            break;
        case "Tampere: CINE ATLAS":
            theatreID = 1034;
            break;
        case "Tampere: PLEVNA":
            theatreID = 1035;
            break;
        case "Turku ja Raisio":
            theatreID = 1047;
            break;
        case "Turku: KINOPALATSI":
            theatreID = 1022;
            break;
        case "Raisio: LUXE MYLLY":
            theatreID = 1046;
            break;
        default:
            theatreID = null;
            var name = document.getElementById("cinema").value;
            alert("Hakemaasi alueen tai teatterin nimeä \"" + name +
                "\" ei löytynyt. Ole hyvä ja valitse nimi alasvetovalikosta tai etsi hakusanalla.");
            document.getElementById("cinema").value = "";
    }
    loadXML();
}

// When user has searched for an area or cinema using the search field, start loading XML
function searchFunction() {
    var valinta = document.getElementById("search").value;
    valinta = valinta.trim();
    valinta = valinta.toLowerCase();
    switch (valinta) {
        case "pääkaupunkiseutu":
            theatreID = 1014;
            searchWord = "Pääkaupunkiseutu";
            break;
        case "espoo":
            theatreID = 1012;
            searchWord = "Espoo";
            break;
        case "espoo: omena":
        case "espoo omena":
        case "omena":
        case "iso omena":
        case "omppu":
        case "iso omppu":
            theatreID = 1039;
            searchWord = "Espoo: OMENA";
            break;
        case "espoo: sello":
        case "espoo sello":
        case "sello":
            theatreID = 1038;
            searchWord = "Espoo: SELLO";
            break;
        case "helsinki":
        case "hki":
        case "stadi":
            theatreID = 1002;
            searchWord = "Helsinki";
            break;
        case "helsinki: itis":
        case "helsinki itis":
        case "helsinki itäkeskus":
        case "itis":
        case "itäkeskus":
            theatreID = 1045;
            searchWord = "Helsinki: ITIS";
            break;
        case "helsinki: kinopalatsi":
        case "helsinki kinopalatsi":
        case "kinopalatsi":
        case "kino":
            theatreID = 1031;
            searchWord = "Helsinki: KINOPALATSI";
            break;
        case "helsinki: maxim":
        case "helsinki maxim":
        case "maxim":
            theatreID = 1032;
            searchWord = "Helsinki: MAXIM";
            break;
        case "helsinki: tennispalatsi":
        case "helsinki tennispalatsi":
        case "tennispalatsi":
        case "tennis":
        case "tennari":
            theatreID = 1033;
            searchWord = "Helsinki: TENNISPALATSI";
            break;
        case "vantaa: flamingo":
        case "vantaa flamingo":
        case "vantaa jumbo":
        case "vantaa":
        case "flamingo":
        case "jumbo":
            theatreID = 1013;
            searchWord = "Vantaa: FLAMINGO";
            break;
        case "jyväskylä: fantasia":
        case "jyväskylä fantasia":
        case "jyväskylä":
        case "jkl":
        case "fantasia":
            theatreID = 1015;
            searchWord = "Jyväskylä: FANTASIA";
            break;
        case "kuopio: scala":
        case "kuopio scala":
        case "kuopio":
        case "scala":
            theatreID = 1016;
            searchWord = "Kuopio: SCALA";
            break;
        case "lahti: kuvapalatsi":
        case "lahti kuvapalatsi":
        case "lahti":
        case "kuvapalatsi":
            theatreID = 1017;
            searchWord = "Lahti: KUVAPALATSI";
            break;
        case "lappeenranta: strand":
        case "lappeenranta strand":
        case "lappeenranta":
        case "strand":
            theatreID = 1041;
            searchWord = "LAPPEENRANTA: STRAND";
            break;
        case "oulu: plaza":
        case "oulu plaza":
        case "oulu":
        case "plaza":
            theatreID = 1018;
            searchWord = "Oulu: PLAZA";
            break;
        case "pori: promenadi":
        case "pori promenadi":
        case "pori":
        case "promenadi":
            theatreID = 1019;
            searchWord = "Pori: PROMENADI";
            break;
        case "tampere":
        case "tre":
            theatreID = 1021;
            searchWord = "Tampere";
            break;
        case "tampere: cine atlas":
        case "tampere cine atlas":
        case "tre cine atlas":
        case "tre atlas":
        case "tre cine":
        case "cine atlas":
        case "cine":
        case "atlas":
            theatreID = 1034;
            searchWord = "Tampere: CINE ATLAS";
            break;
        case "tampere: plevna":
        case "tampere plevna":
        case "tre plevna":
        case "plevna":
            theatreID = 1035;
            searchWord = "Tampere: PLEVNA";
            break;
        case "turku ja raisio":
        case "raisio ja turku":
        case "turku raisio":
        case "raisio turku":
            theatreID = 1047;
            searchWord = "Turku ja Raisio";
            break;
        case "turku: kinopalatsi":
        case "turku kinopalatsi":
        case "kinopalatsi turku":
        case "turku":
            theatreID = 1022;
            searchWord = "Turku: KINOPALATSI";
            break;
        case "raisio: luxe mylly":
        case "raisio luxe mylly":
        case "raisio":
        case "luxe mylly":
        case "luxe":
        case "mylly":
            theatreID = 1046;
            searchWord = "Raisio: LUXE MYLLY";
            break;
        default:
            theatreID = null;
            searchWord = "";
            var name = document.getElementById("search").value;
            alert("Hakemaasi alueen tai teatterin nimeä \"" + name +
                "\" ei löytynyt. Ole hyvä ja kokeile toista hakusanaa tai valitse nimi alasvetovalikosta.");
            document.getElementById("search").value = "";
    }
    loadXML();
    //Convert user's search field input to a more "appropriate" searchWord, to clarify which cinema's data is being fetched
    document.getElementById("search").value = searchWord;
    document.getElementById("search").select();
    return false;
}

function loadXML() {
    if (theatreID != undefined) {
        var url = "https://www.finnkino.fi/xml/Schedule/?area=" + theatreID + "&dt=" + date;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                parseXML(this);
            }
        }
        xhttp.open("GET", url, true);
        xhttp.send();
    }
}

function parseXML(xml) {
    var i;
    var xmlData = xml.responseXML;
    var table = "<table>";
    var x = xmlData.getElementsByTagName("Show");
    // In case there are no shows on the current date, alert user and empty search fields
    if (x.length == 0) {
        var listName = document.getElementById("cinema").value;
        var cinemaName;
        if (listName == "") {
            cinemaName = searchWord;
        } else {
            cinemaName = listName;
        }
        alert(cinemaName + ": Ei näytöksiä tänään. Valitse toinen alue tai teatteri.");
        document.getElementById("cinema").value = "";
        document.getElementById("search").value = "";
    } else {
        for (i = 0; i < x.length; i++) {
            //Check whether chosen image tag exists in XML content
            var tablePic;
            if (x[i].getElementsByTagName("EventSmallImagePortrait").length == 0) {
                tablePic = "<br>Image<br>not<br>found<br><br>";
            } else {
                tablePic = "<img id='moviePic' src='" + x[i].getElementsByTagName("EventSmallImagePortrait")[0].childNodes[0].nodeValue + "'></img>";
            }
            //Save the result from the AJAX call into var table
            table += "<tr><td id='pic' rowspan='2'> <a href='" +
                x[i].getElementsByTagName("EventURL")[0].childNodes[0].nodeValue + "' target='_blank'>" + tablePic +
                "</a></td><td id='today'>" + date + "</td><td id='title'><a href='" +
                x[i].getElementsByTagName("EventURL")[0].childNodes[0].nodeValue +
                "' target='_blank'>" +
                x[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue +
                "</a></td><td id='duration' rowspan='2'> Kesto:<br>" +
                timeConvert(x[i].getElementsByTagName("LengthInMinutes")[0].childNodes[0].nodeValue) +
                "</td></tr><tr><td id='startTime'>" +
                (x[i].getElementsByTagName("dttmShowStart")[0].childNodes[0].nodeValue).slice(11, 16) +
                "</td><td id='auditorium'>Finnkino " +
                x[i].getElementsByTagName("TheatreAndAuditorium")[0].childNodes[0].nodeValue +
                "</td></tr>";
        }
        table += "</table>";
        document.getElementById("results").innerHTML = table;
        document.getElementById("cinema").value = "";
    }
}

//Make "Scroll to top" button visible and usable when the user scrolls down 20px from the top of the document
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scroll").style.display = "block";
    } else {
        document.getElementById("scroll").style.display = "none";
    }
}

document.getElementById("scroll").addEventListener("click", function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.getElementById("cinema").select();
});

//Convert movie duration data from minutes to hours and minutes
function timeConvert(duration) {
    var minutes = duration % 60;
    var hours = (duration - minutes) / 60;
    return hours + " h " + minutes + " min";
}
