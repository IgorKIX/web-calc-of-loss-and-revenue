const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StreetSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    admin: { 
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: [true, 'Admin ID field is required']
    }
});

const Street = mongoose.model('Street', StreetSchema);

module.exports = Street;