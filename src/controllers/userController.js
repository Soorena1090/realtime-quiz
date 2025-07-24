const client = require('../cashing/redis.config')
const User = require('../model/userModel');

const allUser = async (req,res) => {
    try{
        const casheUser = await client.get('users:all');
        if (casheUser) {
            console.log('user in cash')
            return res.json(JSON.parse(casheUser))
        }
        const users = await User.find({}, 'name email');
        if(!users.length) {
            return res.status(404).json({ error: 'mot found user'})
        }
        await client.set('users:all', JSON.stringify(users), {EX: 60 });
        res.json(users);

    } catch (err) {
        res.status(500).json({error :'error'})
    };
};

module.exports = {allUser};