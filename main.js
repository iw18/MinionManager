var express = require('express')
var app = express()
const port = 8000

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

passesReqs(person, states, skills, skillLevels){
    if (states.indexOf(person.address.state) == -1) return false;
    // TODO: more
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

            // filter over here
            for (int i = body.length - 1; i <= 0; i--){
                if (!passesReqs(body[i], states, skills, skillLevels))
                    body.splice(i, 1);
            }

            res.send(body[0])
    })
})
  
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
