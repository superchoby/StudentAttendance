var express = require('express');
var router = express.Router();
/* GET home page. */
router.post('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log(req.body.class_code)
  res.json(req.body)
});

module.exports = router;
