const express           = require('express');
const swaggerUi         = require('swagger-ui-express');
const swaggerDocument   = require('./swagger.json');

require('dotenv').config();
const port = process.env.PORT;

//-------------------------------------------------------------------
// Create Backend source and server 
//-------------------------------------------------------------------
const server  = express();
var router    = express.Router();  

// Import Route	
const api    			= require('./backend/routes/api')(router);

// swagger setup - the port for swagger is in the json file
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

// we skip setting up the frontend 

// for simplicity purpose, separate the router from the server configuration
server.use('/', api);

// Start Server
server.listen(port, () => {
    console.log('Listening on port ', port);
});
