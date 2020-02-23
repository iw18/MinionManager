var express = require('express')
var app = express()
var path = require('path')
const port = 8000
const request = require('request')

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use("/imgs", express.static(__dirname + "/imgs"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})

function passesReqs(person, states, skills, jobApplications){

    /*if (states.indexOf(person.address.state) == -1) return false;
    
    var hasMatchingSkillandLevel = false;
    for (var i = 0; i < person.skills.length; i++){
        if (skills.hasOwnProperty(person.skills[i].name) && skills[person.skills[i].name].indexOf(person.skills[i].level) != -1) {
            hasMatchingSkillandLevel = true;
        }
    }
    if (!hasMatchingSkillandLevel) return false;
   */ 
    if (!jobApplications.find(element => element.personId == person.id)) return false;
    
    return true;
}

app.post('/filter', function (req, res) {
    console.log(req.body);
    
    var jobApplications;
    // get applications so u can ??
    request.get('https://hackicims.com/api/v1/companies/141/applications', {
        auth: {
            bearer: '996855af2954a57fe8e0285a74136151aa7c3b388cf075cf05b127202217dcebacf3558a7fcd6de1943769da66a196d165bdb8286ffb20482fd702c2cc9a6f98'
        },
        json: true
        }, (error, response, body)=>{
            jobApplications = body
    request.get('https://hackicims.com/api/v1/companies/141/people', {
        auth: {
            bearer: '996855af2954a57fe8e0285a74136151aa7c3b388cf075cf05b127202217dcebacf3558a7fcd6de1943769da66a196d165bdb8286ffb20482fd702c2cc9a6f98'
        },
        json: true
        }, (error, response, body)=>{
        
            people = body

            request.get('https://hackicims.com/api/v1/companies/141/jobs', {
                auth: {
                    bearer: '996855af2954a57fe8e0285a74136151aa7c3b388cf075cf05b127202217dcebacf3558a7fcd6de1943769da66a196d165bdb8286ffb20482fd702c2cc9a6f98'
                },
                json: true
            }, (error, response, body)=>{
                jobs = body;
                var jobsArray = [];
                for (var i = jobs.length - 1; i >= 0;i--){
                    if (req.body.jobs.indexOf(jobs[i].title) == -1){
                        jobsArray.push(jobs.id)
//                        jobs.splice(i, 1); // i think i did this right
                    }
                }

                for (var i = jobApplications.length - 1; i >= 0; i--){
                    if (jobsArray.indexOf(jobApplications.jobId) == -1){
                        jobApplications.splice(i, 1);
                    }
                }

                var states = ['New York']

                // key is name, level is value
                // this is just conversions
                skills = {}
                for (var key in req.body){
                    skills[key] = []
                    var value = body[key];
                    if (typeof(value) == 'object' && value.indexOf('beg') != -1) skills[key].push('Beginner')
                    if (typeof(value) == 'object' && value.indexOf('med') != -1) skills[key].push('Advanced')
                    if (typeof(value) == 'object' && value.indexOf('adv') != -1) skills[key].push('Expert')
                }

                // filter over here
                for (var i = people.length - 1; i >= 0; i--){
                    if (!passesReqs(people[i], states, skills, jobApplications))
                        people.splice(i, 1);
                }

            res.send(people);
            })
        })
    })
    
    

})
  
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
