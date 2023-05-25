import bcrypt from 'bcrypt';


const database = {
  users: [
    {
      name: 'Ayvaz',
      id: '001',
      email: 'ayvaz@mail.com',
      joined: new Date(),
      entries: 0
    }
  ],
  login: [
    {
      email: 'ayvaz@mail.com',
      hash: '$2b$10$C1s4hotCmYbpKvmJ7Dh3iera.ZvKQ29tmqjYXSVbJETdViYyxnPAS'
    }
  ]
}

// Sign in function
async function signin(req, res) {
  const { email, password } = req.body; 

  let hashedPassword;

  const user = database.users.find(user => user.email === email)

  if (user) {
    hashedPassword = database.login.find(pass => pass.email === email).hash;
  } else {
    return res.status(400).json({msg: 'Invalid credentials'});
  }

  const isPasswordTrue = await bcrypt.compare(password, hashedPassword);

  if (isPasswordTrue) {
      return res.status(200).json(user);
    } else {
      return res.status(400).json({err: 'Invalid credentials'});
    }
}

// Register function
async function register(req, res) {
  const { email, name, password } = req.body;
  const id = database.users.length ? Number(database.users[database.users.length - 1].id) + 1 : '001';
  const user = {
    name,
    email,
    id: String(id),
    joined: new Date(),
    entries: 0
  };

  await bcrypt.hash(password, 10, (err, hash) => {
    database.login.push({
      email,
      hash
    });
  })

  database.users.push(user);

  res.status(201).json(user);
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
    return res.status(200).json({msg: `Entries updated`, entries: user.entries});
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