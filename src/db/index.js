const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chat-database')
.then(db => console.log('db connect'))
.catch(err => console.log(err));