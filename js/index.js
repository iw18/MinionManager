function handler(checkNum) {
    var beg = document.getElementById('beg'+checkNum);
    var skill = document.getElementById('skill'+checkNum);
    var med = document.getElementById('med'+checkNum);
    var adv = document.getElementById('adv'+checkNum);
    beg.checked = skill.checked;
    med.checked = skill.checked;
    adv.checked = skill.checked;
    //console.log(beg);
}
function handler1(checkNum, String) {
    var beg = document.getElementById('beg'+checkNum);
    var skill = document.getElementById('skill'+checkNum);
    var med = document.getElementById('med'+checkNum);
    var adv = document.getElementById('adv'+checkNum);
    if(beg.checked || med.checked || adv.checked) skill.checked = true;
    else skill.checked = false;
}

function submitForm() {
    document.getElementById("filterForm").submit();
    /*var http = new XMLHttpRequest();
    http.open("POST", "/filter", true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var params = "search=" + document.getElementById(filterForm).value; // probably use document.getElementById(...).value
    http.send(params);
    http.onload = function() {
        alert(http.responseText);
    }*/
}
