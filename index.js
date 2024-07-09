require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const UserV = require('./Models/userVModel');
const Candidate = require('./Models/candidateModel');
const Ballot = require('./Models/ballot1Model');


const userRoutes = require('./Routes/userRoutes')
const voteRoutes = require('./Routes/voteRoutes')
const bodyparser = require('body-parser')

 // Enable CORS for all routes
const app = express();
app.use(cors());
app.use(bodyparser.json());

app.use('/api/user', userRoutes);
app.use('/api/candidates', voteRoutes);





mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    console.log('connected to db')
    // seedDatabase();
  })
  .catch((error) => {
    console.log(error)
  })

  app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
  })
  // const candidates = [
  //   { name: 'Dr Rukaiya'},
  //   { name: 'meriMaamRabia'},
  //   { name: 'Saqib E'},
  //   { name: 'Aneeta batman'},
  //   { name: 'Moona Don'},
  //   { name: 'Faizacutu'},
  // ];
  
  // // Function to seed candidates
  // async function seedDatabase() {
  //   try {
  //     // Clear the Candidate collection
  //     await Candidate.deleteMany({});
  //     console.log('Candidate collection cleared');
  
  //     // Insert new candidate data
  //     await Candidate.insertMany(candidates);
  //     console.log('Candidates seeded successfully');
  //   } catch (error) {
  //     console.error('Error seeding candidates:', error);
  //   }
  // }

//   async function seedDatabase() {
//   try {
//       // Clear existing data
//       await Bike.deleteMany({});
//       await Dock.deleteMany({});
//       await Station.deleteMany({});
//       await User.deleteMany({});
//       await Wallet.deleteMany({});
//       await Transaction.deleteMany({});

//       // Create Stations
//       const station1 = new Station({ name: 'Station1', area: 'BLOCKA' });
//       const station2 = new Station({ name: 'Station2', area: 'BlockG' });

//       await station1.save();
//       await station2.save();

//         // Create Docks
//         const dock1 = new Dock({ name: 'dock 1', qrCode: 'QR1', station: station1._id, status: 'occupied' });
//         const dock2 = new Dock({ name: 'dock 2', qrCode: 'QR2', station: station1._id, status: 'occupied' });
//         const dock3 = new Dock({ name: 'dock 3', qrCode: 'QR3', station: station1._id, status: 'empty' });
//         const dock4 = new Dock({ name: 'dock 4', qrCode: 'QR4', station: station2._id, status: 'empty' });
//         const dock5 = new Dock({ name: 'dock 5', qrCode: 'QR5', station: station2._id, status: 'empty' });
//         const dock6 = new Dock({ name: 'dock 6', qrCode: 'QR6', station: station2._id, status: 'occupied' });

//       await dock1.save();
//       await dock2.save();
//       await dock3.save();
//       await dock4.save();
//       await dock5.save();
//       await dock6.save();

//       // Update Stations with Dock references
//       station1.docks = [dock1._id, dock2._id, dock3._id];
//       station2.docks = [dock4._id, dock5._id, dock6._id];

//       await station1.save();
//       await station2.save();

//       // Create Bikes
//       const bike1 = new Bike({ name: 'bike 1', status: 'available', currentDock: dock1._id });
//       const bike2 = new Bike({ name: 'bike 2', status: 'available', currentDock: dock2._id });
//       const bike3 = new Bike({ name: 'bike 3', status: 'available', currentDock: dock6._id });
//       // const bike4 = new Bike({ status: 'available', currentDock: dock4._id });
//       // const bike5 = new Bike({ status: 'available', currentDock: dock5._id });
//       // const bike6 = new Bike({ status: 'available', currentDock: dock6._id });

//       await bike1.save();
//       await bike2.save();
//       await bike3.save();
//       // await bike4.save();
//       // await bike5.save();
//       // await bike6.save();

//       // Update Docks with Bike references
//       dock1.bike = bike1._id;
//       dock2.bike = bike2._id;
//       dock6.bike = bike3._id;
//       // dock4.bike = bike4._id;
//       // dock5.bike = bike5._id;
//       // dock6.bike = bike6._id;

//       await dock1.save();
//       await dock2.save();
//       await dock6.save();
//       // await dock4.save();
//       // await dock5.save();
//       // await dock6.save();

//        // Create Wallets
//        const wallet1 = new Wallet({ balance: 100.0 });
//        const wallet2 = new Wallet({ balance: 200.0 });

//        await wallet1.save();
//        await wallet2.save();

//        // Create Users and associate wallets
//        const user1 = new User({ name: 'Qabbas Khan', email: 'qabbas@example.com', password: 'Qabbas123', wallet: wallet1._id });
//        const user2 = new User({ name: 'Arham Ali', email: 'arham@example.com', password: 'Arham123', wallet: wallet2._id });

//        await user1.save();
//        await user2.save();

//        // Update Wallets with User references
//        wallet1.user = user1._id;
//        wallet2.user = user2._id;

//        await wallet1.save();
//        await wallet2.save();

//       //  // Create Transactions
//       //  const transaction1 = new Transaction({ user: user1._id, bike: bike1._id, dock: dock1._id, startTime: new Date(), endTime: null, cost: 0 });
//       //  const transaction2 = new Transaction({ user: user2._id, bike: bike2._id, dock: dock2._id, startTime: new Date(), endTime: null, cost: 0 });

//       //  await transaction1.save();
//       //  await transaction2.save();

//       console.log('Database seeded!');
//   } catch (err) {
//       console.error(err);
//   }
// }