#!/usr/bin/python3
import requests
import json
import random

job_titles = ["Goon", "Financial Analyst", "Heavy Weapons Specialist", "Engineer", "Wizard", "Right Hand Woman", "Executioner", "Hacker", "Manager", "Cook"]
skills = ["Enthusiasm", "Programming", "Alchemy", "Lack of Critical Thinking", "Data Analysis", "Engineering", "Muscles", "Oral Communication", "Problem Solving", "Cooking"]
levels = ["Beginner", "Advanced", "Expert"]

# GET Request to get company information
headers = {"Authorization": "Bearer 996855af2954a57fe8e0285a74136151aa7c3b388cf075cf05b127202217dcebacf3558a7fcd6de1943769da66a196d165bdb8286ffb20482fd702c2cc9a6f98","Content-Type":"application/json"}
# Do something with r.json() or r.text
# Status codes can be checked with r.status_code
r = requests.get("https://hackicims.com/api/v1/companies/141/people", headers=headers)
#print(r.text)

r = json.loads((requests.get("https://hackicims.com/api/v1/companies/141/jobs", headers=headers)).text)
i = 0
for job in r:
    job["title"] = job_titles[i]
    i = i + 1
    payload = json.JSONEncoder().encode(job)
    r = requests.put("https://hackicims.com/api/v1/companies/141/jobs/" + str(job["id"]), data=payload, headers=headers)

r = json.loads((requests.get("https://hackicims.com/api/v1/companies/141/people", headers=headers)).text)
for person in r:
    person["skills"] = [{"name" : random.choice(skills), "level" : random.choice(levels)}]
    for i in range(0, random.randint(0,3)):
    	person["skills"].append({"name" : random.choice(skills), "level" : random.choice(levels)})
    payload = json.JSONEncoder().encode(person)
    r = requests.put("https://hackicims.com/api/v1/companies/141/people/" + str(person["id"]), data=payload, headers=headers)

p = json.loads((requests.get("https://hackicims.com/api/v1/companies/141/people", headers=headers)).text)
j = json.loads((requests.get("https://hackicims.com/api/v1/companies/141/jobs", headers=headers)).text)

for job in j:
    print(job["title"])
for person in p:
    print(person["skills"])

print("done")
