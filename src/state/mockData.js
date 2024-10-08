import sunglasses_image from "../images/sunglasses_image.jpeg";
import sneakers_image from "../images/sneakers_image.jpeg";
import shirt_image from "../images/shirt_image.jpeg";
import hat_image from "../images/hat_image.jpeg";
import comb_image from "../images/comb_image.jpeg";
import basketball_image from "../images/basketball_image.jpeg";
import tv_image from "../images/tv_image.jpeg";

const isProduction = process.env.NODE_ENV === "production";
let domain = "http://localhost:3000";

if (isProduction) domain = "https://react-commerce-steel.vercel.app";

export const MOCK_DATA = [
  {
    id: 1,
    title: "Sunglasses",
    price: 19.99,
    // img: sunglasses_image,
    img: `${domain}/images/sunglasses_image.jpeg`,
  },
  {
    id: 2,
    title: "Sneakers",
    price: 34.99,
    // img: sneakers_image,
    img: `${domain}/images/sneakers_image.jpeg`,
  },
  {
    id: 3,
    title: "Shirt",
    price: 24.99,
    img: `${domain}/images/shirt_image.jpeg`,
    // img: shirt_image,
  },
  {
    id: 4,
    title: "Hat",
    price: 15.99,
    // img: hat_image,
    img: `${domain}/images/hat_image.jpeg`,
  },
  {
    id: 5,
    title: "Comb",
    price: 9.99,
    // img: comb_image,
    img: `${domain}/images/comb_image.jpeg`,
  },
  {
    id: 6,
    title: "TV",
    price: 65.99,
    // img: tv_image,
    img: `${domain}/images/tv_image.jpeg`,
  },
  {
    id: 7,
    title: "Basketball",
    price: 49.99,
    img: `${domain}/images/basketball_image.jpeg`,
    // img: basketball_image,
  },
];
