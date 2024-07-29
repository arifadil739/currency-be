import express from 'express'; 
import * as currencyService from "../services/currency.service";
const router = express.Router();

router.get('/all',currencyService.getCurrencies);
router.get('/convert',currencyService.convertCurrency);


module.exports = router;