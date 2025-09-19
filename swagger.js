const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'movie Api',
        description: 'movies Api'
    },
    host: 'backend-xhkx.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);