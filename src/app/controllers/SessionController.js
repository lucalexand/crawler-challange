const { User } = require('../models');

class SessionController {
    async create(req, res) {
        try {
            const { name, email, password } = req.body;

            const user = await User.create({ name, email, password });

            return res.status(200).json({ message: 'User created!' });
        } catch (error) {
            return res.status(400).json({ message: "User wasn't created", error });
        }
    }
    async store(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });

            // if (!user) {
            //     return res.status(401).json({ message: 'User not found' });
            // }

            if (!(await user.checkPassword(password))) {
                return res.status(401).json({ message: 'Incorrect password' });
            }

            return res.json({ user, token: user.generateToken() });
        } catch (error) {
            return res.status(401).json({ message: 'User not found', error });
        }
    }
}

module.exports = new SessionController();