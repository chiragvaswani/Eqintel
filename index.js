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
