require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');
const pathApi = '/api/v1';
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger_output.json');
const cron = require("node-cron");
const axios = require("axios");
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));




// api routes
app.use(pathApi+'/users', require('./components/users/users.controller'));
app.use(pathApi+'/influencers', require('./components/influencers/influencers.controller'));
app.use(pathApi+'/networks', require('./components/networks/networks.controller'));
app.use(pathApi+'/segments', require('./components/segments/segments.controller'));
app.use(pathApi+'/domains', require('./components/domains/domains.controller'));
app.use(pathApi+'/favorites', require('./components/favorites/favorites.controller'));
app.use(pathApi+'/proposals', require('./components/proposals/proposals.controller'));
app.use(pathApi+'/ipublis', require('./components/ipublis/ipublis.controller'));


app.use(pathApi+'/utils', require('./components/utils/util.controller'));

app.use(pathApi+'/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

app.listen(port, () => console.log('Server listening on port ' + port));

console.log('oioioi',process.env.NODE_ENV);
