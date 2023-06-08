const express = require('express');
const router = express.Router();
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');

/* GET users listing. */
const allMobs = JSON.parse(fs.readFileSync('./db/mobs-data.json', 'utf-8'));
console.log(allMobs);

router.get('/', function (req, res, next) {
  res
    .status(200)
    .json({
      status: 'Success',
      count: allMobs.length,
      data: allMobs,
    })
    .end();
});

// `POST YOUR_BACKEND_URL/mobs/` # add a new mob
router.post('/', function (req, res, next) {
  const newId = uuidv4();
  const newMob = {
    id: newId,
    mob_members: [],
    mob_name: req.body.mob_name
  }
  allMobs.push(newMob);
  fs.writeFileSync('./db/mobs-data.json', JSON.stringify(allMobs), () => {
    res
      .status(201)
      .json({
        status: 'Success',
        count: allMobs.length,
        data: allMobs,
      })
      .end();
  });
});

// `GET YOUR_BACKEND_URL/mobs/:mobId` # get a particular mob
router.get('/:id', function (req, res, next) {
  const { id } = req.params
  const targetMob = allMobs.find(element => element.mob_id === id)
  res
  .status(201)
  .json({
    status: 'Success',
    data: targetMob,
  })
  .end()
})

// `GET YOUR_BACKEND_URL/mobs/:mobId/members` # get all mob members of a particular mob
router.get('/:id/members', function (req, res, next) {
  const { id } = req.params
  const targetMob = allMobs.find(element => element.mob_id === id)
  const targetMobMembers = targetMob.mob_members.map(element => element.name)

  res
  .status(201)
  .json({
    status: 'Success',
    data: targetMobMembers,
  })
  .end()
})

// `POST YOUR_BACKEND_URL/mobs/:mobId/members` # add a new mob-member to the mob
router.post('/:id/members', function (req, res, next) {
  const { id } = req.params
  const targetMob = allMobs.find(element => element.mob_id === id)
  req.body.id = uuidv4()
  targetMob.mob_members.push(req.body)
  
  fs.writeFileSync('./db/mobs-data.json', JSON.stringify(allMobs), () => {
    res
      .status(201)
      .json({
        status: 'Success',
        count: allMobs.length,
        data: allMobs,
      })
      .end();
  });

})

// `GET YOUR_BACKEND_URL/mobs/:mobId/members/:memberId` # get a particular mob-member of a particular mob


module.exports = router;
