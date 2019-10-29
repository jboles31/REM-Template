var mongoose = require('mongoose');

//
// Connect with MongoDB with Mongoose
//

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

//
// Create Schemas //
//

var infoSchema = mongoose.Schema({
  movies: [],
});

var titlesSchema = mongoose.Schema({
  Title: String,
  Year: String,
  Actors: String,
  Plot: String,
  Poster: String,
  Released: String,
  Runtime: String,
  Director: String,
  Writer: String,
  Awards: String,
  imdbRating: String,
  BoxOffice: String,
})

//
// Make Model With Schema //
//

const Movies = mongoose.model('marvel', infoSchema);
const Titles = mongoose.model('title', titlesSchema)

//
// DB Funcitons //
//

var selectAll = (callback) => {
  Movies.find({}).limit(1).exec((err, info) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, info);
    }
  });
};

var insertEntry = (entry, callback) => {

  Titles.create({Title: entry.Title, Year: entry.Year, Actors: entry.Actors, Plot: entry.Plot, Poster: entry.Poster, Released: entry.Released, Runtime: entry.Runtime, Director: entry.Director, Writer: entry.Writer, Awards: entry.Awards, imdbRating: entry.imdbRating, BoxOffice: entry.BoxOffice}, (err) => {
    if (err) {
      callback('err') 
    } else {
      callback();
    }
  })
}

var checkEntry = (entry, callback) => {
  entry = entry.replace('+', ' ');

  Titles.find({Title: entry}, (err, info) => {
      if (info.length === 0) {
        callback('err', null)
      } else {
        callback(null, info[0])
    }
  })
}

//
// Export DB functions //
//

module.exports = {
  selectAll,
  checkEntry,
  insertEntry,
};
