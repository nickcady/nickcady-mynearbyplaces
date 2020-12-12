const express = require('express');
var cors = require('cors');
var db = require("./db");
var bodyParser = require("body-parser")
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.get('/', (request, response) => {
    response.send('Welcome to mynearbyplaces API');
})

app.get('/places', (request, response) => {
    db.getPlaces().then(x => response.json(x));
})

app.get('/reviews/:placeid', (request, response) => {
    let requestId = request.params.placeid;
    db.getReviews(requestId).then(x => response.json(x));
});

app.get('/search/:searchTerm/:location', (request, response) => {
    let searchTerm = request.params.searchTerm;
    let location = request.params.location;
    db.search(searchTerm, location).then(x => response.json(x));
})

app.post('/place', (request, response) => {
    console.log(request.body);
    let name = request.body.name;
    let category = request.body.category;
    let city = request.body.city;
    let state = request.body.state;
    db.addPlace(name, category, city, state).then(x => response.json({message: "Place Added!"}));
});

app.post('/review', (request, response) => {
    console.log(request.body);
    let placeid = request.body.placeid;
    let review = request.body.review;
    db.addReview(placeid, review).then(x => response.json({message: "Review Added!"}));
})

app.listen(port, () => {
    console.log(`Imagequiz API listening on port ${port}`);
})