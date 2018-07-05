import axios from 'axios'
import mongoose from 'mongoose';
import Voice from '../models/voice';
import template from './template'

/* 
URL to connect to the Talaikis API, which generates quotes 
(website: https://talaikis.com/random_quotes_api/)
*/
let scriptUrl = 'https://talaikis.com/api/quotes/random/'

/* 
URL to access Voicebunny, specifically to request a new project of type Speedy.
Once this has no intention or ordering projects, the body will always be sent with attribute {"test": 1}.
*/
let voiceUrl = 'https://137066:4a23de57b9136d805f0c35f3abb99ae5@api.voicebunny.com/projects/addSpeedy'

/* 
The headers, to access the APIs.
*/
let headers = { 'Content-Type': 'application/json' }

/* 
Gets a list of the voices saved on the database, 
ordering them by datetime, recents first. 
*/
function getVoiceList() {
    return Voice.find().sort('-createdAt').exec().then(docs => {
        const response = {
            voices: docs.map(doc => {
                return { script: doc.script, voice: doc.voice, author: doc.author, _id: doc._id, createdAt: doc.createdAt }
            })
        };
        return response
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

/* 
Specific function which centralizes and processes the activity on both APIs, in this order:
- Gets a new quote from Talaikis;
- Builds a new body, including {"test": 1};
- Posts a new project to Voicebunny, sending the quote on the body;
- Gets the new voice over in mp3 format;
- Joins the quote info with the new voiceover in a new object;
- calls function to save on database;
*/
function requestNewVoice() {
    console.log('REQUESTING SCRIPT')
    return axios.get(scriptUrl, { headers: headers }).then((newScript) => {
        let body = { test: 1, title: newScript.data.author, script: newScript.data.quote }
        console.log('REQUESTING NEW VOICE')
        axios.post(voiceUrl, body, { headers: headers }).then((responseVoice) => {
            console.log('VOICE RETRIEVED SUCCESSFULLY')
            let newVoice = {
                script: newScript.data.quote,
                voice: responseVoice.data.project.reads[0].urls.part001.default,
                author: newScript.data.author,
                createdAt: new Date()
            }
            return saveNewVoice(newVoice)
        });
    });
}

/* 
This function receives the new voice object in the exact instant it is retrieved from Voicebunny
and joined with the quote information. Uses mongoose to save the information on the database.
*/
function saveNewVoice(voiceInfo) {
    return new Promise((resolve) => {
        let voice = new Voice({ _id: new mongoose.Types.ObjectId(), script: voiceInfo.script, voice: voiceInfo.voice, author: voiceInfo.author, createdAt: voiceInfo.createdAt });
        voice.save().then(result => {
            resolve(result)
        }).catch(err => {
            console.log(err);
        });
    })
}

export default {

    /* 
    Allows the external routes to access the requestNewVoice function.
    */
    postVoice(req, res) {
        requestNewVoice().then((result) => { 
            console.log('GOT HERE')
            res.status(200).json(result)
         })
    },

    /* 
    Allows the external routes to access the getVoiceList function.
    */
    getVoices(req, res) {
        getVoiceList().then((result) => { res.status(200).json(result) })
    },

    /* 
    Allows the external routes to access the requestNewVoice and getVoiceList function.
    Also it is the main call on the template, processing like this:
    - Requests a new quote;
    - Sends to Voicebunny;
    - Saves the result to database;
    - Retrieves an updated list of voices ordered, recent first;
    - Loads the template passing the lis as a parameter;
    */
    accessHtml(req, res) {
        requestNewVoice().then(() => {
            getVoiceList().then((result) => { res.status(200).send(template.getTemplate(result)) })
        })
    }
}

