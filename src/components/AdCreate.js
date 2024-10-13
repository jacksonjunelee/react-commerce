import React, { useState } from "react";
import Analytics from "../utils/Analytics";
import Header from "./Header";
import { useSelector } from "react-redux";

const AdCreate = () => {
  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [savedAds, setSavedAds] = useState([]);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  const [isCartOpen, setIsCartOpen] = useState(false); // State to control the side pane visibility

  const handleSaveAd = () => {
    if (headline && description && buttonText) {
      const newAd = {
        headline,
        description,
        buttonText,
        backgroundImage,
      };
      setSavedAds([...savedAds, newAd]);
      // Reset fields after saving
      setHeadline("");
      setDescription("");
      setButtonText("");
      setBackgroundImage("");
    }
  };

  return (
    <div>
      <Analytics data={{ page: "ad-create" }} />
      <Header
        cartItems={cartItems}
        toggleCart={toggleCart}
        isCartOpen={isCartOpen}
      />
      <div className="ad-creation-container">
        <div class="ad-create-container">
          <div className="ad-creation-form ad-column">
            <h2>Create Your Ad</h2>
            <div className="form-field">
              <label htmlFor="headline">Headline:</label>
              <input
                type="text"
                id="headline"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="button-text">Button Text:</label>
              <input
                type="text"
                id="button-text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="background-image">Background Image URL:</label>
              <input
                type="text"
                id="background-image"
                value={backgroundImage}
                onChange={(e) => setBackgroundImage(e.target.value)}
              />
            </div>
            <button onClick={handleSaveAd}>Save Ad</button>
          </div>

          <div className="ad-preview ad-column">
            <h2>Ad Preview</h2>
            <div
              className="ad-display"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                padding: "20px",
                borderRadius: "8px",
                color: "#fff",
                position: "relative",
              }}
            >
              <h3>{headline || "Your Headline Here"}</h3>
              <p>{description || "Your description goes here."}</p>
              <button>{buttonText || "Click Here"}</button>
            </div>
          </div>
        </div>
        <div className="saved-ads">
          <h2>Saved Ads</h2>
          <div className="ads-grid">
            {savedAds.map((ad, index) => (
              <div
                key={index}
                className="ad-card"
                style={{
                  backgroundImage: `url(${ad.backgroundImage})`,
                  backgroundSize: "cover",
                  padding: "20px",
                  borderRadius: "8px",
                  color: "#fff",
                  position: "relative",
                }}
              >
                <h3>{ad.headline}</h3>
                <p>{ad.description}</p>
                <button>{ad.buttonText}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCreate;
