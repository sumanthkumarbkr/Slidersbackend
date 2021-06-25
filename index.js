const express = require('express');
const app = express();
const router = express.Router();
const db = require('./db');
const sliders = require('./routes/slider');
const Slidersmodel = require('./models/slider');
const cors = require('cors')
var myParser = require('body-parser');
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs');   

// app.use(cors());
app.use(myParser.json({limit: '200mb'}));
app.use(busboy());
app.use(myParser.urlencoded({limit: '200mb', extended: true}));

app.route('/upload')
    .post(function (req, res, next) {
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
			console.log(filename,"filename")
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
			fstream = fs.createWriteStream(__dirname + '/images/' + filename);
			console.log(fstream.path,"filestream")
			file.pipe(fstream);
	   
            fstream.on('close', function () {    
				console.log("Upload Finished of " + filename);    
                res.redirect('back');           //where to go next
            });
        });
    });



app.use('/', router);
app.use('/sliders', sliders);
const port = process.env.PORT || 8080;

app.listen(port, function () {
	console.log('Example app listening on port 8080!')
})