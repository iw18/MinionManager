function handler(checkNum) {
    var beg = document.getElementById('beg'+checkNum);
    var skill = document.getElementById('skill'+checkNum);
    var med = document.getElementById('med'+checkNum);
    var adv = document.getElementById('adv'+checkNum);
    beg.checked = skill.checked;
    med.checked = skill.checked;
    adv.checked = skill.checked;
    console.log(beg);
}