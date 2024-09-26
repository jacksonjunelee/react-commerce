// const sunglasses_image = require("../public/images/sunglasses_image.jpeg").default;
// const sneakers_image = require("../public/images/sneakers_image.jpeg").default;
// const shirt_image = require("../public/images/shirt_image.jpeg").default;
// const hat_image = require("../public/images/hat_image.jpeg").default;
// const comb_image = require("../public/images/comb_image.jpeg").default;
// const basketball_image = require("../public/images/basketball_image.jpeg").default;
// const tv_image = require("../public/images/tv_image.jpeg").default;
const domain = 'http://localhost:3000'

const MOCK_DATA = [
  {
    id: 1,
    title: "Sunglasses",
    price: 19.99,
    img: domain + '/images/sunglasses_image.jpeg',
},
{
    id: 2,
    title: "Sneakers",
    price: 34.99,
    img: domain + '/images/sneakers_image.jpeg',
},
{
    id: 3,
    title: "Shirt",
    price: 24.99,
    img: domain + '/images/shirt_image.jpeg',
},
{
    id: 4,
    title: "Hat",
    price: 15.99,
    img: domain + '/images/hat_image.jpeg',
},
{
    id: 5,
    title: "Comb",
    price: 9.99,
    img: domain + '/images/comb_image.jpeg',
},
{
    id: 6,
    title: "TV",
    price: 65.99,
    img: domain + '/images/tv_image.jpeg',
},
{
    id: 7,
    title: "Basketball",
    price: 49.99,
    img: domain + '/images/basketball_image.jpeg',
  },
];

// Exporting using CommonJS
module.exports = { MOCK_DATA };
