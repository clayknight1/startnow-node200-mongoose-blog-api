const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true},
    lastName: {type: String, required: false},
    email: {type: String, required: true},
    blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],


    social: {
        facebook: { type: String, required: false },
        twitter: { type: String, required: false },
        linkedIn: { type: String, required: false }
    }
});

module.exports = mongoose.model('User', userSchema);