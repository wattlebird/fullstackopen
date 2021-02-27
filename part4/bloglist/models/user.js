const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: { type: String, minLength: 3, unique: true, required: true },
  nickname: String,
  password: { type: String, required: true },
  blog: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  }],
}, {
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    }
  }
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User;
