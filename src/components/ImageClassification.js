import React, { useState, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

const ImageClassification = () => {
  const [imageURL, setImageURL] = useState(null); // Store the uploaded image
  const [results, setResults] = useState([]); // Store the classification results
  const [loading, setLoading] = useState(false); // Indicate model loading
  const imageRef = useRef(null); // Reference to the image DOM element
  const fileInputRef = useRef(null); // Reference to the file input

  // Handle image upload
  const handleUpload = (event) => {
    const file = event.target.files[0];
    const imageURL = URL.createObjectURL(file);
    setImageURL(imageURL); // Update the state with the uploaded image URL
    setResults([]); // Clear previous results
  };

  // Classify the uploaded image
  const classifyImage = async () => {
    setLoading(true);
    const imgElement = imageRef.current;
    const model = await mobilenet.load(); // Load the MobileNet model
    const predictions = await model.classify(imgElement); // Classify the image
    setResults(predictions); // Update the results with the classification
    setLoading(false);
  };

  return (
    <div>
      <div>
        <h1>Image Classification with MobileNet</h1>

        {/* Upload Button */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleUpload}
          style={{ display: "block", marginBottom: "10px" }}
        />

        {/* Display Uploaded Image */}
        {imageURL && (
          <div>
            <img
              src={imageURL}
              alt="Uploaded"
              ref={imageRef}
              style={{ width: "300px", height: "300px", objectFit: "cover" }}
            />
            <button onClick={classifyImage} disabled={loading}>
              {loading ? "Classifying..." : "Classify Image"}
            </button>
          </div>
        )}

        {/* Display Classification Results */}
        {results.length > 0 && (
          <div>
            <h2>Results:</h2>
            <ul>
              {results.map((result, index) => (
                <li key={index}>
                  {result.className} - {(result.probability * 100).toFixed(2)}%
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageClassification;
