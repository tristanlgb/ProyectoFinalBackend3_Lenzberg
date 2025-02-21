import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import dotenv from 'dotenv';
import { create } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import petModel from './dao/models/Pet.model.js'; 
import userModel from './dao/models/User.model.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ Error: MONGO_URI is not defined in the .env file!");
  process.exit(1);
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(dirname(fileURLToPath(import.meta.url)), 'public')));

// Configure Handlebars
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const hbs = create({
    defaultLayout: 'main', 
    layoutsDir: path.join(__dirname, 'views', 'layouts')
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`✅ Connected to MongoDB database: BackendIII`))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));

// Import Routes
import usersRouter from './routes/users.router.js';
import sessionsRouter from './routes/sessions.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionRouter from './routes/adoption.router.js';

// Use Routes
app.use('/api/users', usersRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionRouter);

// View Routes
app.get('/', async (req, res) => {
    try {
        const pets = await petModel.find().lean();
        const users = await userModel.find().lean();

        console.log("✅ Pets fetched:", pets);
        console.log("✅ Users fetched:", users);

        res.render('home', { title: 'Home Page', pets, users });
    } catch (error) {
        console.error("❌ Error fetching data:", error);
        res.status(500).send("Error loading data.");
    }
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
