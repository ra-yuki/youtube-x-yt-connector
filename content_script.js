//////////////////////////////////////////////////
//  ====== Main ======
//////////////////////////////////////////////////
/////////////////
// Setup
/////////////////
// get current url
var url = window.location.href;
// get html element of channel area
//another list of possible ids : channel-header-container, channel-title-container
var channelTitleContainer = document.getElementById("tip");

// anchor-to-url
var flyToUrl = "https://rakutenmafia.azurewebsites.net";

/////////////////
// Update
/////////////////
// get category list by sending ajax from yt-api
// sendHTTPRequest("https://rakutenmafia.azurewebsites.net/api/category/all");
sendHTTPRequest("https://rakutenmafia.azurewebsites.net/api/subtitle?v=CevxZvSJLk8");

/////////////////
// Render
/////////////////
// Note: callback for sendHTTPRequest
function renderCategories(categories){
    // extract category id or whatever

    // create content
    var renderContent = 
        '<li id="dropdown" class="dropdown btn">'+
            '<div class="dropdown-toggle dropdown-title"><b>add to</b> <b class="caret"></b></div>'+
            '<ul class="dropdown-menu">'+
                '<li><a href="'+flyToUrl+'" target="_blank">music</a></li>'+
                '<li><a href="'+flyToUrl+'" target="_blank">comedy</a></li>'+
                '<li><a href="'+flyToUrl+'" target="_blank">presentation</a></li>'+
            '</ul>'+
        '</li>'
    ;

    //set class value
    channelTitleContainer.setAttribute("class", "style-scope dropdown-bg-color");

    //render
    channelTitleContainer.innerHTML += renderContent;
}
// channelTitleContainer.innerHTML += "<span class=\"badge badge-dark\">link</span>";

//////////////////////////////////////////////////
// ====== Helper Functions ======
//////////////////////////////////////////////////
function createAnchorURL(currentUrl, flyToUrl){
    var regex = /[\/]+/;

    // e.g. https://www.youtube.com/channel/UChcgcbX3zMBwd0wTJyy2JlA -> [https:, www.youtube.com, channel, UChcgcbX3zMBwd0wTJyy2JlA]
    var urlBits = currentUrl.split(regex);
    var nameAfterDomain = urlBits[2];

    if(nameAfterDomain == "channel"){
        var anchorRef = flyToUrl+"/api/channels/add?chIds="+nameAfterDomain+"&uNames=";
    }
    else if(nameAfterDomain == "user"){
        var anchorRef = flyToUrl+"/api/channels/add?chIds=&uNames="+nameAfterDomain;
    }
}

function sendHTTPRequest(url){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function(){
        if(this.readyState == 4)
            onHTTRequestDone(this);
    }
    xhr.send();
}

function onHTTRequestDone(response){
    var categories = JSON.parse(response.responseText);
    renderCategories(categories);
}