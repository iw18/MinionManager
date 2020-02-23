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



const json2html = require('node-json2html');
let template = {'<>':'li','html':'${firstName} ${middleName} ${lastName}'};




app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})

function passesReqs(person, states, skills, jobApplications){

    if (states.indexOf(person.address.state) == -1) return false;
    
    var hasMatchingSkillandLevel = false;
    for (var i = 0; i < person.skills.length; i++){
        if (skills.hasOwnProperty(person.skills[i].name) && skills[person.skills[i].name].indexOf(person.skills[i].level) != -1) {
            hasMatchingSkillandLevel = true;
        }
    }
    if (!hasMatchingSkillandLevel) return false;
   
    if (!jobApplications.find(element => element.personId == person.id)) return false;
    
    return true;
}

const statesJSON = {'AK':'Alaska','AL':'Alabama','AR':'Arkansas','AS':'AmericanSamoa','AZ':'Arizona','CA':'California','CO':'Colorado','CT':'Connecticut','DC':'District of Columbia','DE':'Delaware','FL':'Florida','GA':'Georgia','GU':'Guam','HI':'Hawaii','IA':'Iowa','ID':'Idaho','IL':'Illinois','IN':'Indiana','KS':'Kansas','KY':'Kentucky','LA':'Louisiana','MA':'Massachusetts','MD':'Maryland','ME':'Maine','MI':'Michigan','MN':'Minnesota','MO':'Missouri','MP':'Northern Mariana Islands','MS':'Mississippi','MT':'Montana','NA':'National','NC':'North Carolina','ND':'North Dakota','NE':'Nebraska','NH':'New Hampshire','NJ':'New Jersey','NM':'New Mexico','NV':'Nevada','NY':'New York','OH':'Ohio','OK':'Oklahoma','OR':'Oregon','PA':'Pennsylvania','PR':'Puerto Rico','RI':'Rhode Island','SC':'South Carolina','SD':'South Dakota','TN':'Tennessee','TX':'Texas','UT':'Utah','VA':'Virginia','VI':'Virgin Islands','VT':'Vermont','WA':'Washington','WI':'Wisconsin','WV':'West Virginia','WY':'Wyoming'}

app.post('/filter', function (req, res) {
    
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
                
                // empty responses should input nothing TODO: 400 error
                
                
                var jobsArray = [];
                for (var i = jobs.length - 1; i >= 0;i--){
                    if (req.body.jobs.indexOf(jobs[i].title) == -1){
                        jobsArray.push(jobs.id)
                    }
                }
                for (var i = jobApplications.length - 1; i >= 0; i--){
                    if (jobsArray.indexOf(jobApplications.jobId) == -1){
                        jobApplications.splice(i, 1);
                    }
                }

                states = [];
                for (var i = 0; i < req.body.states.length; i++){
                    states.push(statesJSON[req.body.states[i].toUpperCase()])
                }

                // key is name, level is value
                // this is just conversions
                skills = {}
                // TODO: remove states and jobs from the JSON.
                for (var key in req.body){
                    skills[key] = []
                    var value = req.body[key];
                    if (typeof(value) == 'object' && value.indexOf('beg') != -1) skills[key].push('Beginner')
                    if (typeof(value) == 'object' && value.indexOf('med') != -1) skills[key].push('Advanced')
                    if (typeof(value) == 'object' && value.indexOf('adv') != -1) skills[key].push('Expert')
                }


                // filter over here
                for (var i = people.length - 1; i >= 0; i--){
                    if (!passesReqs(people[i], states, skills, jobApplications))
                        people.splice(i, 1);
                }

            console.log(people);
            //res.send(people);
            var html = json2html.transform(people, template)
            // TODO: more json to html
            
            res.send(html);
            })
        })
    })
    
    

})
  
app.listen(port, () => console.log(`App listening on port ${port}!`))
