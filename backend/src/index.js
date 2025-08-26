import app from './app.js';
import './database.js';

app.listen(app.set('port'));

console.log('Server on port', app.set('port'));