var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function(req, file, cb) {
//        cb(null, file.fieldname + '-' + Date.now())
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });

router.get('/',function(req,res){
    res.sendfile("./index.html");
});

router.post('/', upload.single('avatar'), function(req, res) {
//    var tmppath = req.file.path;
//    var targetpath = './public/img/' + req.file.originalname;
//    console.log(req.file.originalname);
//    var src = fs.createReadStream(tmppath);
//    var dest = fs.createWriteStream(targetpath);
//    src.pipe(dest);
//    src.on('end', function() {console.log('complete')});
//    src.on('error', function(err) {res.render('error');});
//
//
});

module.exports = router;