import { compare } from "bcrypt";
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("Email and password are required.");
    }
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      res.status(401).send("Email already exists.");
    }
    const user = await User.create({ email, password });
    res.cookie("jwt", createToken(email, user._id)),
      {
        maxAge,
        secure: true,
        sameSite: "None",
      };
    return res.status(201).json({
      id: user._id,
      email: user.email,
      profileSetup: user.profileSetup,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internel server error.");
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("Email and password are required.");
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send("User with the given Email not found.");
    }
    const auth = await compare(password, user.password);
    if (!auth) {
      res.status(404).send("Invalid credentials.");
    }
    res.cookie("jwt", createToken(email, user._id)),
      {
        maxAge,
        secure: true,
        sameSite: "None",
      };
    return res.status(200).json({
      id: user._id,
      email: user.email,
      profileSetup: user.profileSetup,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      color: user.color,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internel server error.");
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).send("User with the given id is not found.");
    }

    return res.status(200).json({
      id: userData._id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internel server error.");
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { userId } = req;
    const { firstName, lastName, color } = req.body;

    if (!firstName || !lastName ) {
      return res.status(400).send("First Name and Last Name  required.");
    }

    const userData = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, color, profileSetup: true },
      { new: true, runValidatorsl: true }
    );

    return res.status(200).json({
      id: userData._id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internel server error.");
  }
};
