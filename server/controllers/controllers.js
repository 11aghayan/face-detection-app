import bcrypt from 'bcrypt';
import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: {
    host: '',
    port: '',
    user: '',
    password: '',
    database: ''
  }
});


// Sign in 
async function signin(req, res) {

  const { email, password } = req.body;

  try {

    const hash = await db('login').where({ email }).select('hash');
    const isPasswordCorrect = await bcrypt.compare(password, hash[0].hash);

    if ( isPasswordCorrect ) {
      const user = await db('users').where({ email }).select('*');
      return res.status(200).json(user[0]);
    } else {
      return res.status(400).json({ msg: 'Wrong credentials' })
    }

  } catch(err) {

    console.log(err);
    res.status(400).json({ msg: 'Unable to sign in' });

  }

}

// Register 
async function register(req, res) {

  const { email, name, password } = req.body;

  try {

    await bcrypt.hash(password, 10, async (err, hash) => {

      try {

        await db.transaction(async trx => {
        const loginEmail = await trx('login')
            .insert({ email, hash }, 'email');

        const user = await trx('users')
          .insert({
            name,
            email: loginEmail[0].email,
            joined: new Date()
          }, '*');

        return res.status(201).json(user[0]);
        })  

      } catch(err) {

        console.log(err)
        return res.status(400).json({ msg: 'Unable to register' });

      }

    })

  } catch(err) {

    return res.status(400).json({ msg: 'Unable to register' });

  }

}

// Get User 
async function getUser(req, res) {

  const { id } = req.params;

  try {

    const user = await db.select('*').from('users').where({id});

    if (user.length) {
      return res.status(200).json(user[0])
    } else { 
      return res.status(404).json({msg: `No user with id ${id}`})
    }
  } catch(err) {
    return res.status(500).json({msg: 'Error getting user'})
  }

}

// Update entries 
async function updateEntries(req, res) {

  const { id } = req.body;

  try {
    const entries = await db('users')
      .where({id})
      .increment('entries', 1)
      .returning('entries');
    if (entries.length) {
      return res.status(200).json( {entries: entries[0].entries} );
    } else {
      return res.status(404).json( { msg: `No user with id ${id}` } ); 
    }
  } catch (err) {
    return res.status(400).json({msg: 'Unable to increment entries count'})
  }
}

export {
  signin,
  register,
  getUser,
  updateEntries
}