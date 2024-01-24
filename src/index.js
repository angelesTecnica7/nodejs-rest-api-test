import app from './app.js'
import {PORT} from './config.js'
app.listen(PORT) //servidor en el puerto 3000
console.log('Server running on port', PORT)