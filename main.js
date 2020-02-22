var express = require('express')
var app = express()
var path = require('path')
const port = 8000

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})

function passesReqs(person, states, skills){
    if (states.indexOf(person.address.state) == -1) return false;
    console.log('sadfkljsadfj')
    
    var hasMatchingSkillandLevel = false;
    for (var i = 0; i < person.skills.length; i++){
        console.log(person.skills[i].name);console.log(person.skills[i].level);console.log('FIN')
        if (skills.hasOwnProperty(person.skills[i].name) && skills[person.skills[i].name] == person.skills[i].level) {
            hasMatchingSkillandLevel = true;
        }
    }
    if (!hasMatchingSkillandLevel) return false;
    
    return true;
}

app.post('/filter', function (req, res) {
    const request = require('request')
    // TODO: choose those that actually applied for the job
    request.get('https://hackicims.com/api/v1/companies/141/people', {
        auth: {
            bearer: '996855af2954a57fe8e0285a74136151aa7c3b388cf075cf05b127202217dcebacf3558a7fcd6de1943769da66a196d165bdb8286ffb20482fd702c2cc9a6f98'
        },
        json: true
        }, (error, response, body)=>{
            
            states = ['Texas', 'New Jersey', 'Nebraska', 'West Virginia']
            // key is name, level is value
            skills = {'Enthusiasm':'Beginner', 'Responsible':'Beginner', 'Engineering': 'Beginner'}

            // filter over here
            for (var i = body.length - 1; i >= 0; i--){
                if (!passesReqs(body[i], states, skills))
                    body.splice(i, 1);
            }

            res.send(body)
    })
})
  
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
