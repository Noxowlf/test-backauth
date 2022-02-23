import mongoose from 'mongoose'
import config from "./config";

mongoose.connect(config.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(db => console.log('db is connected'))
    .catch(error => console.log(error))
