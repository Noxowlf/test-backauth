import app from './app'
import './database'

app.listen(process.env.PORT || 5000)

console.log("Server listen on port", app.get('port'))
