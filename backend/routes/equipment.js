const router = require('express').Router();
let equipment = require('../models/equipment.model');

router.route('/').get((req, res) => {
    equipment.find()
    .then(equipment => res.json(equipment))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const equipmentName = req.body.equipmentName;
  const category = req.body.category;
  const DOP = Date.parse(req.body.DOP);
  const warranty = Number(req.body.warranty);
  const lastRD = Date.parse(req.body.lastRD);
  const nextRD = Date.parse(req.body.nextRD);

  const newequipment = new equipment({
    equipmentName,
    category,
    DOP,
    warranty,
    lastRD,
    nextRD,
  });

  newequipment.save()
  .then(() => res.json('Equipment added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    equipment.findById(req.params.id)
      .then(equipment => res.json(equipment))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    equipment.findByIdAndDelete(req.params.id)
      .then(() => res.json('Equipment deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    equipment.findById(req.params.id)
      .then(equipment => {
        equipment.equipmentName = req.body.equipmentName;
        equipment.category = req.body.category;
        equipment.DOP = Date.parse(req.body.DOP);
        equipment.warranty = Number(req.body.warranty);
        equipment.lastRD = Date.parse(req.body.lastRD);
        equipment.nextRD = Date.parse(req.body.nextRD);
  
        equipment.save()
          .then(() => res.json('Equipment updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;