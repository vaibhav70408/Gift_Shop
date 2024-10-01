import UserModel from "../model/userModel";
import User from "../types/user";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const hashPassword = (password: string) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

const isAccountPresent = (userName: string, email: string) => {
    const userExists = UserModel.findOne({ where: { userName: userName } })
        .then(user => !!user);

    const emailExists = UserModel.findOne({ where: { email: email } })
        .then(user => !!user);

    return Promise.all([userExists, emailExists])
        .then(([userExists, emailExists]) => ({ userExists, emailExists }));
}

const saveAccount = (userData: User) => {
    return UserModel.create(userData);
}


export default { hashPassword,isAccountPresent, saveAccount };
