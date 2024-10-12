import bcrypt from "bcrypt";

const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export { hashPassword, comparePassword };