const bcrypt = require("bcryptjs");
const User = require("../Models/User");

const register = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).send({ message: "Email and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).send({ message: "Registration successful" });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).send({ message: errors.join(", ") });
    }
    console.error(error);
    res.status(500).send({ message: "Error during registration" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).send({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    res.send({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error during login" });
  }
};

module.exports = {
  register,
  login,
};
