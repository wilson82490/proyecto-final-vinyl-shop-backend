import dotenv from "dotenv";
dotenv.config();

import connectDB from '../config/db.js';


import Vinilos from '../models/vinilos.js';


const vinyls = [
      {
        title: 'Abbey Road',
        artist: 'The Beatles',
        genre: 'Rock',
        year: 1969,
        price: 29.99,
        stock: 10,
        image: 'https://example.com/abbey-road.jpg',
        description: 'The iconic 1969 album from The Beatles, featuring the famous zebra crossing cover.'
      },
      {
        title: 'Thriller',
        artist: 'Michael Jackson',
        genre: 'Pop',
        year: 1982,
        price: 24.99,
        stock: 15,
        image: 'https://example.com/thriller.jpg',
        description: 'Michael Jackson\'s best-selling album with the hit single "Thriller".'
      },
      {
        title: 'Back in Black',
        artist: 'AC/DC',
        genre: 'Rock',
        year: 1980,
        price: 19.99,
        stock: 20,
        image: 'https://example.com/back-in-black.jpg',
        description: 'AC/DC\'s legendary hard rock album released in 1980.'
      }
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