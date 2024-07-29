// const express = require("express");

// const app = express();

// app.get("/", (req, res) => {
//   res.send("Express on Vercel changed");
// });

// app.listen(5000, () => {
//   console.log("Running on port 5000.");
// });

// // Export the Express API
// module.exports = app;
import express, { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
const app = express();
const port = process.env.PORT || 3001;
const ui_base_url = process.env.UI_BASE_URL
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

const currencyRouter = require("./routes/currency.route");
app.use("/currency", currencyRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, 'Not Found'));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
