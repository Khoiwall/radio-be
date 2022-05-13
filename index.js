require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT || 5000
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json
app.use(bodyParser.json())

const routes = require('./src/routes');
const DB = require('./src/config/db/index');

//Connect MongoDB

DB.connectDB();
//socket

io.on("connection", socket => {

  socket.on("dislike-or-like-artist", (allArtists, idArtist, number) => {
    if (number === 0) {
      allArtists.map((artist) => {
        return artist.idArtists === idArtist ? artist.like += 1 : artist.like
      })
      allArtists.sort((a, b) => (a.like < b.like) ? 1 : (b.like < a.like) ? -1 : 0)
    } else {
      allArtists.map((artist) => {
        return artist.idArtists === idArtist ? artist.like -= 1 : artist.like
      })
      allArtists.sort((a, b) => (a.like < b.like) ? 1 : (b.like < a.like) ? -1 : 0)
    }
    io.emit("resend-dislike-or-like-artist", allArtists);
  })
  socket.on("comment", (comment, album) => {
    album.comments.push(comment)
    io.emit("send-comments", album);
  })
})

// app
app.get('/', (req, res) => {
  res.send('Hello World!')
})

routes(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})