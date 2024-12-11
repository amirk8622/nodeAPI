const express = require('express');

const {
  getTotalSupply,
  getBalance,
  getName,
  getSymbol,
  transfer,
  mint,
} = require('../controller/contractController');
const router = express.Router();

router.route('/totalSupply').get(getTotalSupply);

router.route('/balance/:address').get(getBalance);

router.route('/name').get(getName);

router.route('/symbol').get(getSymbol);

router.route('/transfer').post(transfer);

router.route('/mint').post(mint);

module.exports = router;
