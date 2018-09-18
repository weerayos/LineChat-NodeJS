const server = require('express');
const PORT = process.env.PORT || 9999;
const request = require('request');
const bodyParser = require('body-parser');
const firebase = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://chatb-bb6ea.firebaseio.com"
});

server()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false}))
    .get('/', (req, res) => res.send(`Hi there! This is a nodejs-line-api running on PORT: ${ PORT }`))
    // เพิ่มส่วนของ Webhook เข้าไป
    .post('/webhook', function (req, res) {
        let replyToken = req.body.events[0].replyToken;
        let msg = req.body.events[0].message.text;
        
        const db = firebase.database();
        const ref = db.ref("db1/chatbot");
        
        const usersRef = ref.child("chatlog");
        usersRef.set({
          replyToken: msg
        });

        res.json({
            status: 200,
            message: `Webhook is working!`
        });
    })
.listen(PORT, () => console.log(`Listening on ${ PORT }`));
