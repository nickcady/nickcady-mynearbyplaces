const express = require('express');
var cors = require('cors');
var db = require("./db");
const { response } = require('express');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.get('/', (request, response) => {
    response.send('Welcome to mynearbyplaces API');
})

app.get('/places', (request, response) => {
    db.getPlaces().then(x => response.json(x));
})

app.get('/quiz/:id', (request, response) => {
    let requestId = request.params.id;
    let found = data.quizzes.find(x => x.id === Number(requestId));
    if (found) {
        response.json(found.questions);
    }
    else {
        response.status(404).json({error: `The quiz with id ${requestId} was not found`});
    }
});

app.post('/score', (request, response) => {
    let username = request.body.username;
    let quizid = request.body.quizid;
    let score = request.body.score;
    data.scores.push({score: score, quizid: quizid, username: username});
    response.json({message: 'the score was added successfully.'});
})

app.listen(port, () => {
    console.log(`Imagequiz API listening on port ${port}`);
})