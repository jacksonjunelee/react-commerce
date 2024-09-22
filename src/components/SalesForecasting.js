import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
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
    if (purchaseHistory.length === 0) {
      setPrediction("No sales history available for forecasting.");
      return;
    }
  
    const purchaseHistoryMap = purchaseHistory.map((ph) => [ph.totalPrice]);
    const purchaseHistoryData = tf.tensor2d(purchaseHistoryMap);
  
    // Normalize data
    const maxValue = purchaseHistoryData.max().dataSync()[0];
    const normalizedData = purchaseHistoryData.div(maxValue);
  
    // Create input (X) and output (y) datasets
    const windowSize = 3; // Use the last 3 months for prediction
    const X = [];
    const y = [];
  
    for (let i = windowSize; i < normalizedData.shape[0]; i++) {
      X.push(normalizedData.slice([i - windowSize, 0], [windowSize, 1]).arraySync());
      y.push(normalizedData.get(i, 0));
    }
    
    // Convert X and y to tensors with correct shape
    const XTensor = tf.tensor2d(X, [X.length, windowSize]); // Specify shape here
    const yTensor = tf.tensor2d(y, [y.length, 1]); // Shape is (number of samples, 1)
  
    // Define the model
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 20, inputShape: [windowSize], activation: "relu" }));
    model.add(tf.layers.dense({ units: 1 }));
  
    // Compile the model
    model.compile({
      optimizer: "adam",
      loss: "meanSquaredError",
    });
  
    // Train the model
    await model.fit(XTensor, yTensor, { epochs: 500 });
  
    // Predict the next sales value
    const lastWindow = normalizedData.slice([-windowSize, 0], [windowSize, 1]);
    const predictionTensor = model.predict(lastWindow.expandDims(0));
  
    // Extract predicted value, denormalize, and update state
    const predictedSales = predictionTensor.dataSync()[0] * maxValue; // Denormalize
    setPrediction(predictedSales);
  };

  // Prepare data for the line chart
  const chartData = {
    labels: [
      ...purchaseHistory.map((_, index) => `${index + 1}`),
      prediction ? `${purchaseHistory.length + 1}` : null,
    ].filter(Boolean),
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
        data: prediction ? [...purchaseHistory.map((ph) => ph.totalPrice), prediction] : [],
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
        <p className="text-align-left">
          This component predicts sales data for <span className="style-bold">purchased</span> items. It takes in
          purchase history and prepares the data for a <span className="style-bold">time series forecasting
          model</span>. It predicts the next sales data using the latest known data
          point and provides a predicted value.
        </p>
        <div>
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
        </div>
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
