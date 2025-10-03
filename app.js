const express = require("express");
const Song = require("./models/song");
var cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

// Middleware that parses HTTP requests with JSON body
app.use(express.json());

const router = express.Router();

//Render stuff
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find({});
    res.json(songs);
  } catch (err) {
    res.status(500).send("Error fetching songs");
  }
});

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

//Grab a single song in the database
router.get("/songs/:id", async (req,res) => {
    try {
        const song = await Song.findById(req.params.id)
        res.json(song)
    }
    catch (err) {
        console.log("A")
        res.status(400).send("A")
    }
})

router.post("/songs", async (req,res) => {
    try {
        const song = await new Song(req.body)
        await song.save()
        res.status(201).json(song)
        console.log(song)
        res.sendStatus(204)
    }
    catch (err) {
        console.log("B")
        res.status(400).send("B")
    }
})

//update is to update an existing record/resource/database entry.. it uses a put request
router.put("/songs/:id", async(req,res) => {
    //first we need to find and update the song the front end wants us to update to do this we need to request the id of the song from the request and then find it in the database and update it
    try {
        const song = req.body
        await Song.updateOne({_id: req.params.id}, song)
        console.log(song)
    }
    catch (err) {
        console.log("C")
        res.status(400).send("C")
    }
})

router.delete("/songs/:id", function(req,res) {
    Song.deleteOne({_id: req.params.id}, function(err, result) {
        if (err) {
            res.status(400).send(err)
        }
        else if (result.n === 0) {
            res.sendStatus(404)
        }
        else {
            res.sendStatus(204)
        }
    })
})

//all requests the usually use an API start wih /api... so the url would be localhost:3000/api/songs
app.use("/api", router)
app.get("/", (req, res) => {
  res.redirect("/api");
});
app.listen(3000)