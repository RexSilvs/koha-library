const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/library';

async function connectDatabase() {
  mongoose.set('strictQuery', false);

  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000
    });
    console.log('Connected to MongoDB:', MONGO_URI);
  } catch (err) {
    console.warn('MongoDB connection failed:', err.message);
    const mongod = await MongoMemoryServer.create({
      instance: { dbName: 'library' }
    });
    const memoryUri = mongod.getUri();
    await mongoose.connect(memoryUri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000
    });
    console.log('Connected to in-memory MongoDB');
  }
}

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');
const borrowingRouter = require('./routes/borrowing');
const authRouter = require('./routes/auth');

app.use('/api/auth', authRouter);
app.use('/api/books', booksRouter);
app.use('/api/users', usersRouter);
app.use('/api/borrowing', borrowingRouter);

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  });