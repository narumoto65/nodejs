var express = require('express');
var router = express.Router();

/* GET home page. */
router.schedule = function(req, res, next) {
  res.render('schedule', { schedule: ' My Schedule Page!' });
};

module.exports = router;