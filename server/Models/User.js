const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
// The User schema defines the structure of the user data in the database
// It includes fields for username, password, and email
// Each field has its own type and validation rules
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// Pre-save middleware to hash the password before saving the user
// This middleware function is executed before saving a user document
// It uses bcrypt to hash the password for security
// The hashed password is then stored in the database instead of the plain text password
UserSchema.pre('save', async function(next) {
    // Check if the password is modified
    this.password = await bcrypt.hash(this.password, 12);
});


module.exports = mongoose.model('User', UserSchema);

