const server = require('./app');
const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`App is working at port ${port}`));
