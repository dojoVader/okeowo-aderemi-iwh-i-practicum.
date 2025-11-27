const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const app = express();
const process = require("process");


// Constant for Titles

const TITLE = {
    UPDATE_ROUTE: 'Update Custom Object Form | Integrating With HubSpot I Practicum.'
}


// Setup dotenv
dotenv.config();
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS_TOKEN;


app.get("/", async (req, res) => {
    const game_characters_endpoint = 'https://api.hubspot.com/crm/v3/objects/2-146301108?properties=name,bio,country';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(game_characters_endpoint, { headers });
        const characters = resp.data.results;
        res.render('homepage', { title: 'Game Characters | HubSpot APIs', characters });
    } catch (error) {
        console.error(error);
    }
});


app.get("/update-cobj", async (req, res) => {
    res.render("updates", { title: TITLE.UPDATE_ROUTE });
});


app.post("/update-cobj", async (req, res) => {
    const update = {
        "properties": {
            "name": req.body.name,
            "bio": req.body.bio,
            "country": req.body.country
        }
    }

    const updatedEndpoint = `https://api.hubspot.com/crm/v3/objects/2-146301108`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        await axios.post(updatedEndpoint, update, { headers } );
        res.redirect('/', );
    } catch(err) {
        console.error(err);
    }
});

// Set the homepage

// * Localhost
app.listen(3000, () => console.log("Listening on http://localhost:3000"));
