const mongoose = require('mongoose');
const userRoles = require('../../lib/userRoles'); 

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    acc_no: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(userRoles), // Enum values in config
        required: true
    }
});




// // Custom validation for admin role
// userSchema.pre('validate', function (next) {
//     if (this.role === userRoles.ADMIN) {
//         // Check if an admin user already exists
//         mongoose.model('User').findOne({ role: userRoles.ADMIN }, (err, adminUser) => {
//             if (adminUser && (!this.isNew || this.isModified('role'))) {
//                 this.invalidate('role', 'An admin user already exists.');
//             }
//             next();
//         });
//     } else {
//         next();
//     }
// });

// userSchema.pre('validate', function (next) {
//     if (this.acc_no && this.acc_no.length !== 5) {
//         this.invalidate('acc_no', 'Account number is invalid.');
//     }
//     next();
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
