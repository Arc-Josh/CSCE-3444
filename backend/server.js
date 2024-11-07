const express = require('express');
const pgp = require('pg-promise')();
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;
console.log('server starting');
// CORS configuration (allows only your frontend)


// Apply CORS middleware globally
app.use(cors({
  origin: "*",
})
);

// Log incoming requests and headers
app.use((req, res, next) => {
  console.log('Request Headers:', req.headers);
  console.log('CORS Headers:', res.getHeaders()); // Log headers for debugging
  next();
});

// Parse JSON bodies for POST requests
app.use(express.json());

const initDB = () => {
  const dbUrl = process.env.DATABASE_URL || 'postgres://u2c5vm36ggi8fr:pfc1242e1bfbf54426211bfb5728e2b3619cee6e0116c4698025845a27b22e8d7@c67okggoj39697.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d7eu1nblumnk1u';
  return pgp({
    connectionString: dbUrl,
    ssl: {
      rejectUnauthorized: false,
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

// Insert new users into db
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

// Add assignment function
const addEvent = async (username, due_date, assignment_status, title, description, res) => {
  await setSchema('user_info');
  try {
    console.log('Adding Assignment...');
    const user = await db.one('SELECT id FROM user_info.tbl_account_info WHERE username = $1', [username]);
    await db.none('INSERT INTO user_info.tbl_assignments (user_id, due_date, status, title, description) VALUES($1, $2, $3, $4, $5)', [user.id, due_date, assignment_status, title, description]);
    await db.none('INSERT INTO user_info.tbl_user_schedules (user_id, title, description, due_date) VALUES($1, $2, $3, $4)', [user.id, title, description, due_date]);
    console.log("Assignment Added!");
    res.status(200).json({ message: 'successful add' });
  } catch (error) {
    console.error('Error connecting to server', error);
    res.status(500).json({ error: 'Internal database error' });
  }
};



// User login
const userLogin = async (username, password, res) => {
  if(!username || !password){
    console.log('Username or password missing');
    return res.status(400).json({error: "username or password missing"});
  }
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
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
