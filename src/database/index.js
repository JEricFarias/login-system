const mongoose = require('mongoose');

console.log('URI_connection:', process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose;