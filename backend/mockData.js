// const sunglasses_image = require("../public/images/sunglasses_image.jpeg").default;
// const sneakers_image = require("../public/images/sneakers_image.jpeg").default;
// const shirt_image = require("../public/images/shirt_image.jpeg").default;
// const hat_image = require("../public/images/hat_image.jpeg").default;
// const comb_image = require("../public/images/comb_image.jpeg").default;
// const basketball_image = require("../public/images/basketball_image.jpeg").default;
// const tv_image = require("../public/images/tv_image.jpeg").default;
var fs = require('fs');
var path = require('path');

const MOCK_DATA = [
  {
    id: 1,
    title: "Sunglasses",
    price: 19.99,
    img: 'http://localhost:3000/images/sunglasses_image.jpeg',
  },
//   {
//     id: 2,
//     title: "Sneakers",
//     price: 34.99,
//     // img: sneakers_image,
//   },
//   {
//     id: 3,
//     title: "Shirt",
//     price: 24.99,
//     // img: shirt_image,
//   },
//   {
//     id: 4,
//     title: "Hat",
//     price: 15.99,
//     // img: hat_image,
//   },
//   {
//     id: 5,
//     title: "Comb",
//     price: 9.99,
//     // img: comb_image,
//   },
//   {
//     id: 6,
//     title: "TV",
//     price: 65.99,
//     // img: tv_image,
//   },
//   {
//     id: 7,
//     title: "Basketball",
//     price: 49.99,
//     // img: basketball_image,
//   },
];

// Exporting using CommonJS
module.exports = { MOCK_DATA };
