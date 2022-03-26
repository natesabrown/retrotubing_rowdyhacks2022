import 'dotenv/config';
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const url = 'https://api.assemblyai.com/v2/realtime/token';
const params = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'authorization': process.env.ASSEMBLYAI_API_KEY
  },
  body: JSON.stringify({expires_in: 1800}) // seconds
}

app.get('/', (req, res) => {

  // getting the token
  fetch(url, params)
    .then(response => response.json())
    .then(response => res.json(response.token))
    .catch(err => {
      const {response: {status, data}} = err;
      res.status(status).json(data);
    });
});

app.set('port', 8000);
const server = app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${server.address().port}`);
});
