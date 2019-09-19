const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chats = new Schema({
    userName: String,
    mje: String
});

module.exports = mongoose.model('chats', chats);