var express = require('express');
var router = express.Router();

var textMiner = require('../helper/textMiner')

var multer  =   require('multer');
const storage =  multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage})

router.post('/', upload.single("file"), function(req,res){
  // handling file upload logic
  const file = req.file
  if (!file) {
    res.statusCode = 400;
    res.end("Error file Missing")
    return res;
  }
  if (file.mimetype.split('/')[0] !== "text"){
    res.statusCode = 400 ;
    res.end("Error Incorrect file Type");
    return res;
  }
  // call hander
  response = textMiner(file);

  res.json(response)
});


module.exports = router;
