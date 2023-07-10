const cluster = require('cluster');
const express = require('express');
const path = require('path');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const app = express();

  // Serve static files
  app.use(express.static(path.join(__dirname)));

  app.listen(8000, () => {
    console.log(`Worker ${process.pid} started`);
    console.log('App is running at http://localhost:8000');
  });
}

