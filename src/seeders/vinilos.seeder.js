import dotenv from "dotenv";
dotenv.config();

import connectDB from '../config/db.js';


import Vinilos from '../models/vinilos.js';


const vinyls = [
  {
    name: 'Abbey Road',
    artist: 'The Beatles',
    category: 'Rock',
    year: 1969,
    price: 29.99,
    stock: 10,
    featured: true,
    image: '/images/abbey_road.svg',
    description: 'The iconic 1969 album from The Beatles, featuring the famous zebra crossing cover.',
  },
  {
    name: 'Thriller',
    artist: 'Michael Jackson',
    category: 'Pop',
    year: 1982,
    price: 24.99,
    stock: 15,
    featured: true,
    image: '/images/thriller.svg',
    description: "Michael Jackson's best-selling album with the hit single \"Thriller\".",
  },
  {
    name: 'Back in Black',
    artist: 'AC/DC',
    category: 'Rock',
    year: 1980,
    price: 19.99,
    stock: 20,
    featured: false,
    image: '/images/back_to_black.svg',
    description: "AC/DC's legendary hard rock album released in 1980.",
  },
];

const seedVinyls = async () => {
  try {
    await connectDB();
    await Vinilos.deleteMany();
    await Vinilos.insertMany(vinyls);
    console.log('Vinyls seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding vinyls:', error);
    process.exit(1);
  }
};

seedVinyls();