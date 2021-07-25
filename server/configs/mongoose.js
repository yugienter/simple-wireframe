const mongoose = require("mongoose");
const ENV_CONF = require("./env.conf");

const { MONGO_URI, NODE_ENV } = ENV_CONF;

(async () => {
  try {
    await mongoose.connect(MONGO_URI[NODE_ENV], {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

const db = mongoose.connection;

db.on("open", () => {
  console.log(`Successfully connected to MongoDB ${MONGO_URI[NODE_ENV]}`);
});

db.on("error", console.error.bind(console, "Can't connect to MongoDB: "));

module.exports = mongoose;
