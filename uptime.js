const express = require('express');
const http = require('http');
const app = express();

// 5 Minute Ping Times
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const fetch = require("superagent");
      fetch.get(`https://incandescent-hamster.glitch.me/`).set('user-agent', 'official-pinger/1.0.0').then(x => x);
    setInterval(() => {
      fetch.get(`https://incandescent-hamster.glitch.me/`).set('user-agent', 'official-pinger/1.0.0').then(x => x);
    }, 180000); 
    setInterval(() => {
      fetch.get(`https://incandescent-hamster.glitch.me/`).set('user-agent', 'official-pinger/1.0.0').then(x => x);
    }, 240000);

require('./server.js')