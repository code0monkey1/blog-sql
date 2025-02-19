import { User,Blog } from "../models/index.js";

const postUser = async (req, res, next) => {
    try {
        // create a new user
        const newUser = await User.create(req.body);
        res.json(newUser);

    } catch (err) {
        next(err);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        // get all users
        const users = await User.findAll({
            include: {
                model: Blog,
                attributes:{
                    exclude: ['userId']
                }
            }
        });
        res.json(users);

    } catch (err) {
        next(err);
    }
}

const updateUserByUsername = async (req, res, next) => {
        try {
            // update a user by username
            const user = await User.findOne({ where: { username:req.params.username } });

            if (!user) {
                return res.status(404).send('User not found');
            }

            user.email = req.body.email;

            await user.save();

            res.json(user);

        } catch (err) {
            next(err);
        }
    }

export default {
    postUser,
    getAllUsers,
    updateUserByUsername,
}