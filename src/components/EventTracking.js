import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa"; // Import shopping cart icon from react-icons
import Analytics from "../utils/Analytics";
import Header from "./Header";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

// Register all necessary components
Chart.register(...registerables);

const EventTracking = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const cart = useSelector((state) => state.cart);
  const analytics = useSelector((state) => state.analytics.events);
  const { cartItems } = cart;
  const [isCartOpen, setIsCartOpen] = useState(false); // State to control the side pane visibility

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Prepare data for the Line Chart
  const lineChartData = {
    labels: analytics.map((event) =>
      new Date(event.timestamp).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Events Over Time",
        data: analytics.map((event) => event.data.someValue), // Replace 'someValue' with the actual property to visualize
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  // Prepare data for the Bar Chart
  const barChartData = {
    labels: analytics.map((event) => event.eventName),
    datasets: [
      {
        label: "Event Frequency",
        data: analytics.map((event) => event.data.someCount), // Replace 'someCount' with the actual property to visualize
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="productContainer analytics-header">
        <Analytics data={{ page: "event-tracking" }} />
        <Header
          cartItems={cartItems}
          toggleCart={toggleCart}
          isCartOpen={isCartOpen}
        />

        <h1 className="ml-title">Event Tracking and Analysis for Ecommerce</h1>

        {/* Two-column layout for event data and chart */}
        <div className="analytics-layout">
          <div className="analytics-container">
            <h2>Event Data</h2>
            {analytics.length > 0 ? (
              analytics.map((event, index) => (
                <div key={index} className="analytics-item">
                  <p>
                    <strong>Event Name:</strong> {event.eventName}
                  </p>
                  <p>
                    <strong>Event Data:</strong>{" "}
                    {JSON.stringify(event.data, null, 2)}
                  </p>
                  <p>
                    <strong>Timestamp:</strong>{" "}
                    {new Date(event.timestamp).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p>No analytics data available.</p>
            )}
          </div>

          {/* Charts for visual representation */}
          <div className="chart-container">
            <h2>Analysis</h2>
            <div className="chart-placeholder">
              <h3>Line Chart</h3>
              <Line data={lineChartData} />
            </div>
            <div className="chart-placeholder">
              <h3>Bar Chart</h3>
              <Bar data={barChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTracking;
