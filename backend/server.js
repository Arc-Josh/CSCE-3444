const express = require('express');
const pgp = require('pg-promise')();
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 4000;


const initDB = () => {
  return pgp('postgres://postgres:schedy_123@localhost:5432/schedy')
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
// inserts new users into db 
const registerUser = async ( username, real_password, email, res)=>{
  await setSchema('user_info');
  const password = await bcrypt.hash(real_password, 10);
  try{
    console.log('attempting user registration');
    await db.none('INSERT INTO user_info.tbl_account_info (username, password, email) VALUES($1, $2, $3)', [username, password, email]);
    console.log('User Registration Successful!');
    res.status(201).json({message:"Account Created!"});
  }catch (error){
    if(error.code === '23505'){
      console.error('Error creating account: Username or email already in use');
      res.status(409).json({error:"Error creating account "});
    }else if(error.code === '23514'){
      console.error('Error creating account: Invalid email/username');
      res.status(409).json({error:"Error creating account "});
    }else{
      console.error('Error creating account: Database error');
      res.status(500).json({error:"Internal database error "});
    }
  }
};
const userLogin = async (username, password, res) =>{
  await setSchema('user_info');
   try{ 
    const user = await db.one('SELECT password FROM tbl_account_info WHERE username = $1',[username]);
    const match = await bcrypt.compare(password, user.password);
    if(match){
      console.log('Login Successful');
      res.status(200).json({message:"login successful"});
    }else{
      console.log("Incorrect Username/Password");
      res.status(401).json({error:"Invalid Login"})
    }
    }catch(error){
      if(error.cod === 0){
        console.error("User not found");
        res.status(404).json({error:"Invalid User"});
      }else{
        console.error("Database error");
        res.status(500).json({error:"Internal server error"});
      }
    }
  
}

db.one('SELECT $1 AS value', 123)
  .then((data) => {
    console.log('DATA:', data.value);
  })
  .catch((error) => {
    console.log('ERROR:', error);
  }); 
// Middleware
app.use(express.json());
// Basic route

app.get('/', (req, res) => {
  res.send();
});
app.post('/register', async (req, res) => {
  // Destructure the username, password, and email from the request body
  const { username , password , email } = req.body;
  await registerUser(username, password, email, res);
});
app.post('/login', async (req,res) => {
  const { username, password } = req.body;
  await userLogin(username, password, res); 
})


//Start the server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





