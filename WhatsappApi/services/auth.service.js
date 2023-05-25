const { users,usermaster } = require('../models');
const { Op } = require("sequelize");
const { to, TE, ReE } = require('../services/util.service'); 

const createUser = async (userInfo,res) => {
    let auth_info, err;
    auth_info = {};
    auth_info.status = 'create';
    [err, user] = await to(users.create(userInfo));
    if (err) {
        ReE(res, {"Email": 'User already exists with that email.'}, 200);
    } else {
        return user; 
    }
}
module.exports.createUser = createUser;

const authUser = async function (userInfo, res) {
    let auth_info = {};
    auth_info.status = 'login';
    if (!userInfo.Email) TE('Please enter an email to login');
    if (!userInfo.Password) TE('Please enter a password to login');
    let err, user;
    [err, user] = await to(users.findOne({where: { Email: userInfo.Email }}));
    if (!user) 
    return ReE(res, {"Email": "Email not registered"}, 200);
    [err, user] = await to(user.comparePassword(userInfo.Password));
    if (err) ReE(res, {"Password": err.message}, 200);
    return user;
}
module.exports.authUser = authUser;

const authAdmin = async function (userInfo, res) {
    let auth_info = {};
    auth_info.status = 'login';
    if (!userInfo.Username) TE('Please enter an email to login');
    if (!userInfo.Password) TE('Please enter a password to login');
    let err, user;
    [err, user] = await to(usermaster.findOne({where: { Username: userInfo.Username }}));
    if (!user) 
    return ReE(res, {"Email": "Email not registered"}, 200);
    [err, user] = await to(user.comparePasswordAdmin(userInfo.Password));
    if (err) ReE(res, {"Password": err.message}, 200);
    return user;
}
module.exports.authAdmin = authAdmin;