const mongoose = require("mongoose");
const dotenv = require("dotenv");

// process.on("uncaughtException", (err) => {
//   console.log("unhandle exception process shutting down");
//   console.log(err.name, err.message);

//   process.exit(1);
// });

dotenv.config();
const app = require("./app");

const DB = process.env.DATABASE_HOST.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log(`DB Connected sucessfully`));

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// process.on("unhandleRejection", (err) => {
//   console.log("unhandle rejection process shutting down");
//   console.log(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });
