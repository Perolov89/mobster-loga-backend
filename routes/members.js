var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// `GET YOUR_BACKEND_URL/mobs/:mobId/members` # get all mob members of a particular mob
// `POST YOUR_BACKEND_URL/mobs/:mobId/members` # add a new mob-member to the mob
// `GET YOUR_BACKEND_URL/mobs/:mobId/members/:memberId` # get a particular mob-member of a particular mob

module.exports = router;