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
  let newMob = Object.assign({ mob_id: newId }, req.body);
  newMob.mob_members.forEach((element) => (element.id = uuidv4()));
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
  const targetMob = allMobs.find(i => i.mob_id === id)
  res
  .status(201)
  .json({
    status: 'Success',
    data: targetMob,
  })
  .end()
})

module.exports = router;
