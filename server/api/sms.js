const Vonage = require('@vonage/server-sdk')
const express = require('express')

const api = express.Router()

api.get('/', (req, res)=>{
    res.send(sendSms())
})

function sendSms(){
    const vonage = new Vonage({
        apiKey: "b65409d0",
        apiSecret: "agK00JLrgCm2e6SN"
        })
        const from = "Vonage APIs"
        const to = "84837307538"
        const text = 'A text message sent using the Vonage SMS API'

        vonage.message.sendSms(from, to, text, (err, responseData) => {
            if (err) {
                console.log(err);
            } else {
                if(responseData.messages[0]['status'] === "0") {
                    console.log("Message sent successfully.");
                } else {
                    console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                }
            }
        })
}




module.export = api