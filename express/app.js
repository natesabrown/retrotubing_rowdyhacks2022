import 'dotenv/config';
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const url = 'https://api.assemblyai.com/v2/realtime/token';

const data = {
  "expires_in": 120
};

const params = {
  headers: {
    "authorization": process.env.ASSEMBLYAI_API_KEY,
    "content-type": "application/json",
  },
  body: JSON.stringify(data),
  method: "POST"
};

app.get('/', (req, res) => {
  fetch(url, params)
    .then(response => response.json())
    .then(data => {
      res.json(data['token']);
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

app.set('port', 9000);
const server = app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${server.address().port}`);
});
