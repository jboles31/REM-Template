require('dotenv').config();
var express = require('express');
// var mongoose = require('mongoose');
// var db = require('../db/index'); 
var axios = require('axios');

var app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/api/:title', (req, res) => {

  db.checkEntry(req.params.title, (err, results) => {
    if (err) {
      axios.get(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&t=${req.params.title}`)
      .then((data) => {
        db.insertEntry(data.data, (err) => {
          if (err) {
            throw err 
          } else {
            res.send(data.data);
          }
        })
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(400);
      })
    } else {
      res.send(results);
    }
  })
})

app.get('/info', (req, res) => {
  db.selectAll((err, results) => {
    if (err) { res.sendStatus(400)}
    res.send(results)
  })
})

// mongoose.connect('mongodb://localhost/movies', {useNewUrlParser: true}, (err) => {
//   if (err) { throw error }
//   app.listen(PORT, function() {
//     console.log(`listening on port ${process.env.PORT}`);
//   });
// });

app.listen(process.env.PORT, function() {
  console.log(`listening on port ${process.env.PORT}`);
});



