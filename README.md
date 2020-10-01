# quizman
A simple quiz-making/-taking app built with React and MongoDB


# dependencies
express - router
bcrypt - hashing for paswords
jsonwebtoken - creates a JWT to access protected routes
config - local environment and global vars
express-validator - body data validation
mongoose - MongoDB abstraction

# default.json (used to define global variables)
```json
{
    mongoURI: "secret"
}
```

# db.js
```javascript
// in config/ so not repo'd with git
const mongoose = ('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = () => {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => console.log('DB Connected'))
        .catch((err) => {
            console.error(err.message);
            process.exit(1);
        });
};

module.exports = connectDB;
```

Which is then called in Server.js
```javascript
//server.js
const connectDB = require('./config/db') 
connectDB();
```


