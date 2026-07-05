const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    fullName: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Student', 'CR', 'Admin'],
        default: 'Student'
    }
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)