const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'movie Api',
        description: 'movies Api'
    },
    host: 'localhost:5000',
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);