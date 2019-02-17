const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    street:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Street',
        required: [true, 'Street ID field is required']
    },
    date: {
        type: Date,
        default: Date.now()
    },
    profit: {
        type: Number,
        default: 0
    },
    loss: {
        type: Number,
        default: 0
    }
});

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;