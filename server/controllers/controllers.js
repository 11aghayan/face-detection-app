import bcrypt from 'bcrypt';


const database = {
  users: [],
  login: []
}

// Sign in function
async function signin(req, res) {
  const { email, password } = req.body; 

  let hashedPassword;

  if (email === database.users[0].email) {
    hashedPassword = database.login.find(pass => pass.email === email).hash;
  } else {
    return res.status(400).json({msg: 'Invalid credentials'});
  }

  const isPasswordTrue = await bcrypt.compare(password, hashedPassword);

  if (isPasswordTrue) {
      return res.status(200).json({msg: 'signin'});
    } else {
      return res.status(400).json({msg: 'Invalid credentials'});
    }
}

// Register function
function register(req, res) {
  const { email, name, password } = req.body;
  const id = database.users.length ? Number(database.users[database.users.length - 1].id) + 1 : '001';
  const user = {
    name,
    email,
    id: String(id),
    joined: new Date(),
    entries: 0
  };

  bcrypt.hash(password, 10, (err, hash) => {
    database.login.push({
      email,
      hash
    });
  })

  database.users.push(user);

  res.status(201).send({msg: 'User created', user});
}

// Get User function
function getUser(req, res) {
  const { id } = req.params;

  const user = database.users.find(user => user.id === id);

  if (user) {
    return res.status(200).json({msg: `User ID : ${id}`, user})
  }else { 
    return res.status(404).json({msg: `No user with id ${id}`})
  }

}

// Update entries function
function updateEntries(req, res) {
  const { id } = req.body;

  const user = database.users.find(user => user.id === id);
  
  if (user) {
    user.entries++;
    return res.status(200).json({msg: `Entries updated`, user});
  } else {
    return res.status(404).json({msg: `User with id ${id} was not found`})
  }
  
}

export {
  signin,
  register,
  getUser,
  updateEntries
}