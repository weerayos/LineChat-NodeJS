const request = require('request');
const apiToken = 'ScXXvFL5OVLPWBs5wOVdf42WgFbNcMHeRGW/vzCgsQWtUUrQuACct48IWkinDmQLKBg7QuTuwpF++WdD4zwgxcKzZ9C5tUu7EdBhRPzPDpmXuveBoY4mhPxOtGrfXZryCaSR96g1Vg0aP+kwBbNJFwdB04t89/1O/w1cDnyilFU=';
const apiRoute = 'https://api.line.me/v2/bot/message/reply';
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + apiToken
};

class LineAPIService {
	constructor() {}
    
    reply(replyToken, messages) {
        return new Promise(function (resolve, reject) {
            try {
                let body = JSON.stringify({
                    replyToken: replyToken,
                    messages: messages
                })
                return request.post({
                    url: apiRoute,
                    headers: headers,
                    body: body
                }, (err, res, body) => {
                    console.log('status = ' + res.statusCode);
                    return resolve(res.statusCode);
                });
            }
            catch (e) {
                return reject(e);
            }
        });
    }
}
module.exports = new LineAPIService();
