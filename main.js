var express = require('express')
var app = express()
var path = require('path')
const port = 8000
const request = require('request')

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})

function passesReqs(person, states, skills, jobApplications){

    if (states.indexOf(person.address.state) == -1) return false;
    
    var hasMatchingSkillandLevel = false;
    for (var i = 0; i < person.skills.length; i++){
        if (skills.hasOwnProperty(person.skills[i].name) && skills[person.skills[i].name] == person.skills[i].level) {
            hasMatchingSkillandLevel = true;
        }
    }
    if (!hasMatchingSkillandLevel) return false;
    
    if (!jobApplications.find(element => element.personId == person.id)) return false;
    
    return true;
}

app.post('/filter', function (req, res) {
    // TODO: choose those that actually applied for the job
    
    var jobApplications;
    // get applications so u can ??
    request.get('https://hackicims.com/api/v1/companies/141/applications', {
        auth: {
            bearer: '996855af2954a57fe8e0285a74136151aa7c3b388cf075cf05b127202217dcebacf3558a7fcd6de1943769da66a196d165bdb8286ffb20482fd702c2cc9a6f98'
        },
        json: true
        }, (error, response, body)=>{
            jobApplications = body
            /////////////////////////////
    request.get('https://hackicims.com/api/v1/companies/141/people', {
        auth: {
            bearer: '996855af2954a57fe8e0285a74136151aa7c3b388cf075cf05b127202217dcebacf3558a7fcd6de1943769da66a196d165bdb8286ffb20482fd702c2cc9a6f98'
        },
        json: true
        }, (error, response, body)=>{
            
            // TODO: get passed in form response and replace these static values.
            states = ['Texas', 'New Jersey', 'Nebraska', 'West Virginia']
            // key is name, level is value
            skills = {'Enthusiasm':'Beginner', 'Responsible':'Beginner', 'Engineering': 'Beginner'}

            // filter over here
            for (var i = body.length - 1; i >= 0; i--){
                if (!passesReqs(body[i], states, skills, jobApplications))
                    body.splice(i, 1);
            }

            res.send(body)
    })
            ////////////////////////////
    })
    
    

})
  
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
