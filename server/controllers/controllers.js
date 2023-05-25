
const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@mail.com',
      password: 'secret',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Jack',
      email: 'jack@mail.com',
      password: 'secret',
      entries: 0,
      joined: new Date()
    }
  ]
}

// Sign in function
function signin(req, res) {
  const { email, password } = req.body; 

  if (
    email === database.users[0].email 
    &&
    password === database.users[0].password
    ) {
      return res.status(200).json({msg: 'signin'});
    } else {
      return res.status(400).json({msg: 'Invalid credentials'});
    }
}

function a(req, res) {
  res.json(database.users);
}

// Register function
function register(req, res) {
  const { email, name, password } = req.body;
  const id = Number(database.users[database.users.length - 1].id) + 1;
  const user = {
    name,
    email,
    password,
    id: String(id),
    joined: new Date(),
    entries: 0
  };

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
  a,
  signin,
  register,
  getUser,
  updateEntries
}