const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: String
});

module.exports = model('User', schema);