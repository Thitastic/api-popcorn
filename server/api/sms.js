const Vonage = require('@vonage/server-sdk')
const express = require('express')

const api = express.Router()

api.post('/', (req, res)=>{
    res.send(req.body.message)
})

api.get('/test', (req, res)=>{
    res.send("Hello")
})

// function sendSms(message){
//     const vonage = new Vonage({
//         apiKey: "b65409d0",
//         apiSecret: "agK00JLrgCm2e6SN"
//         })
//         const from = "POPCORN"
//         const to = message.number
//         const text = message.text

//         vonage.message.sendSms(from, to, text, (err, responseData) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 if(responseData.messages[0]['status'] === "0") {
//                     console.log("Message sent successfully.");
//                     return 200
//                 } else {
//                     console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
//                     return 404
//                 }
//             }
//         })
// }




module.exports = api