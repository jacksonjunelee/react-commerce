import React, { useState, useEffect } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";

const ImageClassification = ({ products }) => {
  const [loading, setLoading] = useState(true);
  const [productResults, setProductResults] = useState([]);
  const [results, setResults] = useState([]);
  const [imageURL, setImageURL] = useState(null); // State for the uploaded image URL

  // Classify all product images on component mount
  useEffect(() => {
    const classifyAllProducts = async () => {
      setLoading(true);
      const model = await mobilenet.load(); // Load the MobileNet model

      const predictions = await Promise.all(
        products.map(async (product) => {
          const img = new Image();
          img.src = product.img; // Assume product.img is the URL of the product image
          await img.decode(); // Ensure the image is loaded
          const result = await model.classify(img);
          return { product, result };
        })
      );

      setProductResults(predictions);
      setLoading(false);
    };

    classifyAllProducts();
  }, [products]);

  const handleClassifyUploadedImage = async (imgElement) => {
    const model = await mobilenet.load();
    const predictions = await model.classify(imgElement);
    setResults(predictions);
  };

  return (
    <div className="image-classification-container">
      <h1 className="text-align-center">Image Classification with MobileNet</h1>
      
      <p className="text-align-left">
        This component is still <span className="style-bold">experimental</span>. It uses TensorFlow's MobileNet model for image classification. The results and accuracy of the classifications are displayed below.
      </p>

      {/* Display Product Images Classification Results */}
      {loading ? (
        <p>Loading classification results...</p>
      ) : (
        <div>
          <h2>Product Classification Results:</h2>
          <div className="product-results-container display-flex">
            {productResults.map(({ product, result }, index) => (
              <div key={index} className="product-result-item">
                <h4>{product.title}</h4>
                <img
                  src={product.img}
                  alt={product.title}
                  className="product-image"
                />
                <ul className="results-list">
                  {result.map((res, predIndex) => (
                    <li key={predIndex} className="result-item">
                      {res.className} - {(res.probability * 100).toFixed(2)}%
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      <h3>Try out the image classification model with your own image</h3>
      {/* Upload Button */}
      <input
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files[0];
          const newImageURL = URL.createObjectURL(file);
          setImageURL(newImageURL); // Set the uploaded image URL
          const imgElement = new Image();
          imgElement.src = newImageURL;
          imgElement.onload = () => handleClassifyUploadedImage(imgElement);
        }}
        className="upload-input"
      />

      {/* Display Uploaded Image */}
      {imageURL && (
        <div className="image-display">
          <h4>Uploaded Image:</h4>
          <img src={imageURL} alt="Uploaded" className="uploaded-image" />
        </div>
      )}

      {/* Display Uploaded Image Classification Results */}
      {results.length > 0 && (
        <div className="results-container">
          <h2>Uploaded Image Results:</h2>
          <ul className="results-list">
            {results.map((result, index) => (
              <li key={index} className="result-item">
                {result.className} - {(result.probability * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageClassification;
