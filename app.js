const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();
const PORT = 4000;

const uri = "mongodb+srv://nhom10:web21ktpm@cluster0.uveminn.mongodb.net/nhom10?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const addUser = async () => {
  const newUser = new User({
    userID: 'd01',
    password: 'password',
    chucvu: 'dan',
    hoTen: 'Le Dinh Dan',
    nsinh: new Date('1990-11-21'),
    email: 'tonytran12@gmail.com',
    sdt: '0156156165',
    phuong: null,
    quan: null,
  });

  try {
    const savedUser = await newUser.save();
    console.log(`User ${savedUser.userID} has been added.`);
  } catch (error) {
    console.error(`Error occurred while adding user: ${error}`);
  }
};

addUser();


app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=604800');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});