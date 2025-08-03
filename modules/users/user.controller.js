const userModel = require("./user.model");
const { generateHash, compareHash } = require("../../utils/hash");
const { signToken} = require("../../utils/token");

const create = async (payload) => {
  const { email, password } = payload;
  const newUser = await userModel.findOne({ email });
  if (newUser) throw new Error("user already exists");
  payload.password = generateHash(password);
  const result = await userModel.create(payload);
  return result;
};

const login = async (payload) => {
  const { email, password } = payload;
  const user = await userModel
    .findOne({ email })
    .select("+password"); // return password too, since model is defined to not return password
  if (!user) throw new Error("User not found");
  const checkPassword = compareHash(user?.password, password);
  if (!checkPassword) throw new Error("Email or Password is incorrect");
  const tokenPaylaod = {
    name: user?.name,
    email: user?.email,
  };
  const Token = signToken(tokenPaylaod);
  if (!Token) throw new Error("Something went wrong");
  return { Token, name: user?.name, email: user?.email, id: user?._id };
};

const removeById = (id) => {
  return userModel.deleteOne({ _id: id });
};

const getProfile = (_id) => {
  return userModel.findOne({ _id });
};

const updateById = async (id, payload) => {
  return userModel.findOneAndUpdate({ _id: id }, payload, { new: true });
};

module.exports = {
  create,
  login,
  getProfile,
  updateById,
  removeById
};