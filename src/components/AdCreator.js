import React, { useState } from "react";
import Analytics from "../utils/Analytics";
import Header from "./Header";
import { useSelector } from "react-redux";

const AdCreator = () => {
  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(
    `${getImageDomain()}/bg-1.jpg`
  );
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

      console.log("saved ads: ", savedAds);
      // Reset fields after saving
      setHeadline("");
      setDescription("");
      setButtonText("");
      setBackgroundImage("");
    }
  };

  const backgroundImages = [
    `${getImageDomain()}/bg-1.jpg`,
    `${getImageDomain()}/bg-2.jpg`,
    `${getImageDomain()}/bg-3.jpg`,
    `${getImageDomain()}/bg-4.jpg`,
    `${getImageDomain()}/bg-5.jpg`,
  ];

  return (
    <div>
      <Analytics data={{ page: "ad-creator" }} />
      <Header
        cartItems={cartItems}
        toggleCart={toggleCart}
        isCartOpen={isCartOpen}
      />
      <div className="ad-creation-container">
        <div className="ad-creator-container">
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
              <label>Choose Background:</label>
              <div className="image-selector">
                {backgroundImages.map((img, index) => (
                  <button
                    key={index}
                    className={`image-option ${
                      backgroundImage === img ? "selected" : ""
                    }`}
                    onClick={() => setBackgroundImage(img)}
                    style={{
                      backgroundImage: `url(${img})`,
                      backgroundSize: "cover",
                      width: "60px",
                      height: "60px",
                      border:
                        backgroundImage === img ? "2px solid #FF5733" : "none",
                      borderRadius: "8px",
                      margin: "5px",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  ></button>
                ))}
              </div>
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

function getImageDomain() {
  let domain = "http://localhost:3000";
  const isProduction = process.env.NODE_ENV === "production";
  if (isProduction) domain = "https://react-commerce-steel.vercel.app";
  return domain + "/images";
}

export default AdCreator;
