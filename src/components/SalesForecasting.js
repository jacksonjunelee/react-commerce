import React, { useState, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

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
    const lastSalesValue = purchaseHistoryMap[purchaseHistoryMap.length - 1][0]; // Get the last known sales value
    const nextMonthSales = tf.tensor2d([[lastSalesValue]]); // Last known sales value
    const predictionTensor = model.predict(nextMonthSales);

    // Extract the predicted value and set it in the state
    const predictedSales = predictionTensor.dataSync()[0];
    setPrediction(predictedSales);
  };

// Prepare data for the line chart
const chartData = {
  labels: [
    ...purchaseHistory.map((_, index) => `${index + 1}`),
    prediction ? `${purchaseHistory.length + 1}` : null // Add a label for the predicted sales
  ].filter(Boolean), // Remove any null values
  datasets: [
    {
      label: "Purchase History",
      data: purchaseHistory.map((ph) => ph.totalPrice),
      fill: false,
      borderColor: "blue",
      tension: 0.1,
    },
    {
      label: "Predicted Sales",
      data: prediction
        ? [...purchaseHistory.map((ph) => ph.totalPrice), prediction] // Add predicted value
        : [],
      fill: false,
      borderColor: "red",
      tension: 0.1,
      borderDash: [5, 5],
    },
  ],
};

const chartOptions = {
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Purchase History',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Dollars',
      },
    },
  },
};


  return (
    <div>
      <div className="forecasting-container">
        <h1 className="text-align-center">Sales Forecasting</h1>
        <p className="text-align-center">
          This component predicts sales data for <span className="style-bold">purchased</span> items. It takes in
          purchase history and prepares the data for a <span className="style-bold">time series forecasting
          model</span>. It predicts the next sales data using the latest known data
          point and provides a predicted value.
        </p>
        <p>
          To use:
          <ol>
            <li>Add items to the cart.</li>
            <li>
              Click on the cart icon next to the "React Commerce" header. You
              should see cart items.
            </li>
            <li>
              Click the "Buy Now (for ML purposes only)" button. This button was
              made to test the ML functionalities of this component and should
              only be used as such.
            </li>
            <li>You can repeat the steps to add more purchase history.</li>
            <li>
              Once purchase data is captured, the component can then use ML
              models to make sales predictions.
            </li>
          </ol>
        </p>
        <button className="forecast-button" onClick={simulateSalesForecasting}>
          Predict Next Month's Sales
        </button>
        {prediction !== null && (
          <p className="forecast-result">
            {typeof prediction === "string"
              ? prediction
              : `Predicted Sales for Next Month: $${prediction.toFixed(2)}`}
          </p>
        )}

        {/* Line Chart */}
        {purchaseHistory.length > 0 && (
          <div className="chart-container">
            <h2>Sales Data</h2>
            <Line data={chartData} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesForecasting;
