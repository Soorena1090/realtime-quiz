const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {typeo: String, require: true},
    email: {type: String, require:true, unique: true},
    password: { type: String, required:true}
});

const User = mongoose.model('User', userSchema);
module.exports = User;