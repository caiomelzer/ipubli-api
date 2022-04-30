require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');
const pathApi = '/api/v1';
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger_output.json');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use(pathApi+'/users', require('./components/users/users.controller'));
app.use(pathApi+'/influencers', require('./components/influencers/influencers.controller'));
app.use(pathApi+'/networks', require('./components/networks/networks.controller'));
app.use(pathApi+'/segments', require('./components/segments/segments.controller'));
app.use(pathApi+'/domains', require('./components/domains/domains.controller'));

app.use(pathApi+'/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));