const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Chats = new Schema({
    userName: String,
    mje: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Chats', Chats);