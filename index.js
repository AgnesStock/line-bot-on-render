const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(event => {
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: 'Hello from your Render LINE bot!'
    });
  }))
  .then(result => res.json(result))
  .catch(err => {
    console.error(err);
    res.status(500).end();
  });
});

const client = new line.Client(config);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
