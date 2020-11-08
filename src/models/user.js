const mongoose = require('../database')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    dafault: Date.now
  }
});

UserSchema.pre("save", async (next) => {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;