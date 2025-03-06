const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
});

UserSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) return next();
  user.password = await bcrypt.hash(user.password, 8);
  next();
}); 

module.exports = mongoose.model('User', UserSchema);
