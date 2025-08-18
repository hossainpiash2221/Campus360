const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// MongoDB connection
const mongoURI = 'mongodb+srv://piash:221002221@cluster0.cglicit.mongodb.net/?retryWrites=true';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define Mongoose schemas and models
const foodSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  category: String,
  image: String, // base64 or URL
});
const awaitedSchema = new mongoose.Schema({
  name: String,
  item: String,
});
const orderSchema = new mongoose.Schema({
  id: String,
  time: String,
  pickupTime: String,
  items: [
    {
      foodName: String,
      price: Number,
    },
  ],
  total: Number,
  status: String,
});

const Food = mongoose.model('Food', foodSchema);
const Awaited = mongoose.model('Awaited', awaitedSchema);
const Order = mongoose.model('Order', orderSchema);

// Routes for foods
app.get('/api/foods', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/foods', async (req, res) => {
  try {
    const food = new Food(req.body);
    await food.save();
    res.status(201).json(food);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/foods/:id', async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.json({ message: 'Food deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes for awaited
app.get('/api/awaited', async (req, res) => {
  try {
    const awaited = await Awaited.find();
    res.json(awaited);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/awaited', async (req, res) => {
  try {
    const awaited = new Awaited(req.body);
    await awaited.save();
    res.status(201).json(awaited);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/awaited/:id', async (req, res) => {
  try {
    await Awaited.findByIdAndDelete(req.params.id);
    res.json({ message: 'Awaited person deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes for orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    await Order.findOneAndDelete({ id: req.params.id });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
