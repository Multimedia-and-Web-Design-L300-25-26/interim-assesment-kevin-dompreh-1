const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://extraordinary-chaja-c53e4c.netlify.app/",
    credentials: true,
  }),
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {
  res.send("API is working!");
});

app.use("/api/crypto", require("./routes/cryptoRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
