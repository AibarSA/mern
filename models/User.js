const {Schema, model, Types} = require('mongoose')

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    register_date: {type: Date, default: Date.now},
    //links: [{type: Types.ObjectId, ref: 'Link'}]
})

module.exports = model('User', userSchema)