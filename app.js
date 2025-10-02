const express = require("express");
const Song = require("./models/song");
var cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

// Middleware that parses HTTP requests with JSON body
app.use(express.json());

const router = express.Router();

//Handle GET / requests

//Get list of all songs in the database
router.get("/songs", async (req,res) =>{
    try {
        const songs = await Song.find({})
        res.json(songs)
        console.log(songs)
    }
    catch (err) {
        console.log(err)
    }
})

router.post("/songs", async (req,res) => {
    try {
        const song = await new Song(req.body)
        await song.save()
        res.status(201).json(song)
        console.log(song)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

//all requests the usually use an API start wih /api... so the url would be localhost:3000/api/songs
app.use("/api", router)
app.get("/", (req, res) => {
  res.redirect("/api");
});
app.listen(3000)