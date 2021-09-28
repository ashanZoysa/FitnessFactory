const router = require('express').Router();
let stock = require('../models/stock.model');

router.route('/').get((req, res) => {
    stock.find()
    .then(stock => res.json(stock))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const stockName = req.body.stockName;
  const category = req.body.category;
  const quantity = Number(req.body.quantity);
  const unitPrice = Number(req.body.unitPrice);
  const unitCost = Number(req.body.unitCost);

  const newstock = new stock({
    stockName,
    category,
    quantity,
    unitPrice,
    unitCost,
  });

  newstock.save()
  .then(() => res.json('Stock added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    stock.findById(req.params.id)
      .then(stock => res.json(stock))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    stock.findByIdAndDelete(req.params.id)
      .then(() => res.json('Stock deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    stock.findById(req.params.id)
      .then(stock => {
        stock.stockName = req.body.stockName;
        stock.category = req.body.category;
        stock.quantity = Number(req.body.quantity);
        stock.unitPrice = Number(req.body.unitPrice);
        stock.unitCost = Number(req.body.unitCost);
  
        stock.save()
          .then(() => res.json('Stock updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;