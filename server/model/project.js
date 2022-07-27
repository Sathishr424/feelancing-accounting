const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    "user_id": String,
    "title": String,
    "start_date": Date,
    "end_date": Date,
    "description": String,
    "cover": String,
    "status": Boolean,
    "budget": Number,
    'github': String,
    "tags": [String]
});

projectSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
});

module.exports = mongoose.model('Project', projectSchema);