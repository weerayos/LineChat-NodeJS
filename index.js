const server = require('express');
const PORT = process.env.PORT || 9999;
const request = require('request');
const bodyParser = require('body-parser');
const lineMessaging = require('./src/classes/line-messaging');
const firebase = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "xxxxxxxx"
});

server()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false}))
    .get('/', (req, res) => res.send(`Hi there! This is a nodejs-line-api running on PORT: ${ PORT }`))
    // เพิ่มส่วนของ Webhook เข้าไป
    .post('/webhook', function (req, res) {
        let replyToken = req.body.events[0].replyToken;
        let message = req.body.events[0].message.text;
        
        console.log(`Message token : ${ replyToken }`);
        console.log(`Message from chat : ${ message }`);

        const db = firebase.database();
        const ref = db.ref("db1/chatbot");
        const timeRef = (new Date()).getTime();
        
        var words = message.split(':');

        const chatLog = ref.child(words[0]);
        chatLog.set({
            Problem: words[1],
            Time: timeRef
        });

        lineMessaging.replyMessage(replyToken, message).then(function (rs) {

            console.log(`Reply message result : ${ rs }`);

            res.json({
                status: 200,
                message: `Sent message!`
            });
        });
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));
