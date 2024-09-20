import React, { useState, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { useSelector } from "react-redux";

const SalesForecasting = () => {
  const [prediction, setPrediction] = useState(null);
  const purchaseHistory = useSelector((state) => state.sales.purchaseHistory);
  const testData = tf.tensor2d([
    [100],
    [120],
    [130],
    [150],
    [170],
    [200],
    [230],
    [250],
    [300],
    [320],
  ]);

  const simulateSalesForecasting = async () => {
    console.log("purchase history: ", purchaseHistory);

    // Check if purchase history is empty
    if (purchaseHistory.length === 0) {
      setPrediction("No sales history available for forecasting.");
      return;
    }

    const purchaseHistoryMap = purchaseHistory.map((ph) => [ph.totalPrice]);
    const purchaseHistoryData = tf.tensor2d(purchaseHistoryMap);
    // Simulated sales data (e.g., monthly sales over a period of time)
    const salesData = purchaseHistoryData;

    console.log("sales data: ", salesData);

    // Prepare input and output data for the time series forecasting model
    const X = salesData.slice([0, 0], [salesData.shape[0] - 1, 1]); // Inputs (past sales)
    const y = salesData.slice([1, 0], [salesData.shape[0] - 1, 1]); // Outputs (future sales)

    // Define the model (Sequential Dense Network)
    const model = tf.sequential();
    model.add(
      tf.layers.dense({ units: 10, inputShape: [1], activation: "relu" })
    ); // Hidden layer
    model.add(tf.layers.dense({ units: 1 })); // Output layer (predict future sales)

    // Compile the model
    model.compile({
      optimizer: "adam",
      loss: "meanSquaredError",
    });

    // Train the model
    await model.fit(X, y, { epochs: 200 });

    // Predict the next sales value using the latest known data point
    const nextMonthSales = tf.tensor2d([[320]]); // Last known sales value
    const predictionTensor = model.predict(nextMonthSales);

    // Extract the predicted value and set it in the state
    const predictedSales = predictionTensor.dataSync()[0];
    setPrediction(predictedSales);
  };

  return (
    <div>
      <div>
        <h1>Sales Forecasting</h1>
        <button onClick={simulateSalesForecasting}>
          Predict Next Month's Sales
        </button>
        {prediction !== null && (
        <p>
          {typeof prediction === "string"
            ? prediction
            : `Predicted Sales for Next Month: $${prediction.toFixed(2)}`}
        </p>
      )}
      </div>
    </div>
  );
};

export default SalesForecasting;
