const Vonage = require('@vonage/server-sdk')
const express = require('express')

const api = express.Router()

api.post('/', (req, res)=>{
    res.send(sendSms(req.body.message))
})

api.get('/test', (req, res)=>{
    res.send("Hello")
})

function sendSms(message){
    const vonage = new Vonage({
        apiKey: "3a6c01e7",
        apiSecret: "ZqqQaeFcfMis0vqC"
        })
        const from = "POPCORN"
        const to = message.number
        const text = message.text

        vonage.message.sendSms(from, to, text, (err, responseData) => {
            if (err) {
                console.log(err);
            } else {
                if(responseData.messages[0]['status'] === "0") {
                    console.log("Message sent successfully.");
                    return 200
                } else {
                    console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                    return 404
                }
            }
        })
}




module.exports = api
