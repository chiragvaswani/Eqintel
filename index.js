function getCorrelation(StockA, StockB) {
  if (StockA.length !== StockB.length) {
    // trim the longer array.
  }
  averageA = StockA.sum() / StockA.length;
  averageB = StockB.sum() / StockB.length;
  deviationA = [];
  deviationB = [];
  for (let i = 0; i < StockA.length; i++) deviationA.push(StockA[i] - averageA);
  for (let i = 0; i < StockB.length; i++) deviationB.push(StockB[i] - averageB);
  squaredProductSum = 0;
  for (let i = 0; i < StockA.length; i++)
    squaredProductSum +=
      deviationA[i] * deviationA[i] * deviationB[i] * deviationB[i];
  productSum = Math.sqrt(squaredProductSum); // numerator
  deviationASquaredSum = 0;
  deviationBSquaredSum = 0;
  for (let i = 0; i < StockA.length; i++) {
    deviationASquaredSum += deviationA[i] * deviationA[i];
    deviationBSquaredSum += deviationB[i] * deviationB[i];
  }
  // denominator
  deviationASum = Math.sqrt(deviationASquaredSum);
  deviationBSum = Math.sqrt(deviationBSquaredSum);
  correlation = productSum / (deviationASum * deviationBSum);
}

// server
const bodyParser = require("body-parser");
const express = require("express");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/tickers", async (req, res) => {
  tickerStockA = req.body.stockA;
  tickerStockB = req.body.stockB;
  region = req.body.region;
  console.log(
    `Ticker A: ${tickerStockA}\nTicker B: ${tickerStockB}\nRegion: ${region}`
  );
  stockAData = await getStockData(tickerStockA, region);
  stockBData = await getStockData(tickerStockB, region);
  console.log("Stock A Data: " + stockAData.length);
  console.log("Stock B Data: " + stockBData.length);
});

app.listen(3000, () => console.log("Server running at 3000"));

async function getStockData(ticker, region) {
  const options = {
    method: "GET",
    url: "https://yh-finance.p.rapidapi.com/stock/v3/get-historical-data",
    params: { symbol: ticker, region: region },
    headers: {
      "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
      "X-RapidAPI-Key": "13a4e865e8msh8a137de04f92ba0p146243jsn663bf25b78fa",
    },
  };

  try {
    const response = await axios.request(options);
    const data = response.data.prices;
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}
