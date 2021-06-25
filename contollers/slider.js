const Sliders = require('../models/slider');
var busboy = require('connect-busboy'); 
var fs = require('fs'); 

exports.get = function (req, res) {
  Sliders.find(req.query).exec(function (err, sliders) {
    if (err) {
      res.status(400);
    }
    res.status(200).send(sliders)
  });
}

exports.create = (req, res) => {
  var fstream;
  var reqObj;
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
    console.log(filename, "filename")
    console.log("Uploading: " + filename);
   reqObj={
			name:filename,
			url:fstream.path,
			status:"uploaded"
		}    
    //Path where image will be uploaded
    fstream = fs.createWriteStream(__dirname + '/images/' + filename);
    console.log(fstream.path, "filestream")
    file.pipe(fstream);
  });
  var newSliders = new Sliders(reqObj);
  newSliders.save(function (err, sliders) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).send(sliders)
    }
  });
}



exports.update = function (req, res) {
  reqObj={
    status:"deleted"
  } 
  Sliders.findOneAndUpdate(req.body._id, reqObj).exec(function (err, sliders) {
    if (err) {
      res.status(400).send('Unable to update');
    } else {
      res.status(201).send(sliders)
    }
  });
}

// exports.delete = function (req, res) {
//   Sliders.remove({ _id: req.params.id }).exec(function (err) {
//     if (err) {
//       res.status(400).send('Unable to delete');
//     } else {
//       res.status(201).send("Process is completed");
//     }
//   });
// }