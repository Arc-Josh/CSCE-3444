const express = require('express');
const pgp = require('pg-promise')();
const bcrypt = require('bcrypt');
const cors = require('cors');
const axios = require('axios');

const canvasUrl = 'https://unt.instructure.com';
//const accessToken = '9082~ZYUTAxC43rZmcUa6reMvfuWkrwyeJM6cKNvELn96NeD7AnKFJvu3zhKYTXXf4cGH'; // Your token

const getAccessToken = async () => {
  try {
    const response = await axios.post('https://canvas.instructure.com/login/oauth2/token', {
      client_id: 'YOUR_CLIENT_ID',
      client_secret: 'YOUR_CLIENT_SECRET',
      code: 'AUTHORIZATION_CODE_FROM_REDIRECT',
      redirect_uri: 'YOUR_REDIRECT_URI',
      grant_type: 'authorization_code'
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
  }
};
const fetchUserCourses = async (accessToken) => {
  try {
    const userResponse = await axios.get('https://canvas.instructure.com/api/v1/users/self/courses', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    console.log(userResponse.data);
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
};
getAccessToken();
//fetchUserCourses();
const app = express();
const port = process.env.PORT || 8080;

// CORS configuration (allows only your frontend)
const corsOptions = {
  origin: '*', // Replace with your frontend's address
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*'); // or the specific origin like 'http://localhost:8082'
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.send();
});
// allows for connections from different ports, which was the biggest problem last time 
app.use(cors(corsOptions)); // Apply CORS middleware globally
app.use((req, res, next) => {
  console.log('Request Headers:', req.headers);
  console.log('CORS Headers:', res.getHeaders()); // Log headers
  next();
});
// Parse JSON bodies for POST requests
app.use(express.json());
//new database connection with cloud url 
const initDB = () => {
  const dbUrl = process.env.DATABASE_URL || 'postgres://u2c5vm36ggi8fr:pfc1242e1bfbf54426211bfb5728e2b3619cee6e0116c4698025845a27b22e8d7@c67okggoj39697.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d7eu1nblumnk1u';
  return pgp({
    connectionString:dbUrl,
    ssl: {
      rejectUnauthorized: false
    }
  });
};
const db = initDB();

const setSchema = async (schema) => {
  try {
    await db.none(`SET SEARCH_PATH TO ${schema}`);
    console.log(`Schema set to ${schema}`);
  } catch (error) {
    console.error('Error setting schema:', error);
  }
};

// Inserts new users into db
const registerUser = async (username, real_password, email, res) => {
  await setSchema('user_info');
  const password = await bcrypt.hash(real_password, 10);
  try {
    console.log('Attempting user registration');
    await db.none('INSERT INTO user_info.tbl_account_info (username, password, email) VALUES($1, $2, $3)', [username, password, email]);
    console.log('User Registration Successful!');
    res.status(201).json({ message: 'Account Created!' });
  } catch (error) {
    if (error.code === '23505') {
      console.error('Error creating account: Username or email already in use');
      res.status(409).json({ error: 'Username or email already in use' });
    } else {
      console.error('Error creating account:', error);
      res.status(500).json({ error: 'Internal database error' });
    }
  }
};

// User login
const userLogin = async (username, password, res) => {
  await setSchema('user_info');
  try {
    const user = await db.one('SELECT password FROM tbl_account_info WHERE email = $1', [username]);
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      console.log('Login Successful');
      res.status(200).json({ message: 'Login successful' });
    } else {
      console.log('Incorrect Username/Password');
      res.status(401).json({ error: 'Invalid Login' });
    }
  } catch (error) {
    if (error.code === '0') {
      console.error('User not found');
      res.status(404).json({ error: 'Invalid User' });
    } else {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// Routes
app.post('/register', async (req, res) => {
  console.log('POST /register request received');
  const { username, password, email } = req.body;
  try {
    await registerUser(username, password, email, res);
  } catch (error) {
    res.status(500).json({ error: 'Error during registration' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    await userLogin(username, password, res);
  } catch (error) {
    res.status(500).json({ error: 'Error during login' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
