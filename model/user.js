const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
    'userCreated': Date,
    'lastLogin': Date,
    'logins': [Date]
})

const userSchema = new mongoose.Schema({
    'username': String,
    'password': String,
    'email': String,
    'info': infoSchema
});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
});

module.exports = mongoose.model('User', userSchema);