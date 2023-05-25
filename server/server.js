import express from "express";
import router from './routes/routes.js';

const app = express();


// Middleware
app.use(express.json());
app.use(express.static('../client'));

// Routes middleware
app.use('/', router);

//Port
const PORT = 7000;

// Async function to start server
function start() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch(err) {
    console.log(err)
  }
}

start();