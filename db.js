require('dotenv').config();
const { Pool } = require('pg');


const postgreConnectionString =
    `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`;

console.log(postgreConnectionString);

const postgrePool = new Pool({
    connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : postgreConnectionString,
    ssl: { rejectUnauthorized: false }
});

function getPlaces() {
    return postgrePool.query("SELECT * FROM mynearbyplaces.place;").then(x => x.rows);
}

function getReviews(id) {
    return postgrePool.query("SELECT * FROM mynearbyplaces.review WHERE placeid = $1;", [id]).then(x => x.rows);
}

function addPlace(name, category, city, state) {
    let thisquery = "INSERT INTO mynearbyplaces.place (place, category, city, state) VALUES ('" + name + "', '" + category + "', '" + city + "', '" + state + "');"
    return postgrePool.query(thisquery).then(x => x.rows);
}

function addReview(id, review) {
    let thisquery = "INSERT INTO mynearbyplaces.review (placeid, review) VALUES (" + id + ", '" + review + "');"
    return postgrePool.query(thisquery).then(x => x.rows);
}

function search(searchTerm, location) {
    let thisquery = "SELECT * FROM mynearbyplaces.place where " + searchTerm +" ~* '" + location + "';";
    return postgrePool.query(thisquery).then(x => x.rows);
}

module.exports = { getPlaces, getReviews, addPlace, addReview, search }