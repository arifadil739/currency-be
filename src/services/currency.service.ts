import { NextFunction, Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import createHttpError from "http-errors";

dotenv.config();

const currency_base_url = process.env.CURRENCY_BASE_URL;
const api_key = process.env.API_KEY;

export async function getCurrencies(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await axios.get(`${currency_base_url}/currencies`, {
      params: {
        apikey: api_key,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.log(error);
    return next(createHttpError());
  }
}

export async function convertCurrency(req: Request, res: Response) {
  const { from_curr, to_curr, amount } = req.query;
  const response = await axios.get(`${currency_base_url}/latest`, {
    params: {
      apikey: api_key,
      base_currency: from_curr,
      currencies: to_curr,
    },
  });
  const rate = response.data.data[`${to_curr}`];
  const convertedAmount = Number(amount) * rate;
  res.json({
    amount: convertedAmount,
  });
}
