const db = require('../models')
var bcrypt = require("bcryptjs");
const User = db.user


const {Router} = require("express")

const router = Router();

router.get('/listuser', async (req, res) =>{
    const user = await User.findAll()
    res.status(200).json(user)
})

router.post('/createuser', async (req, res) =>{

    const newuser = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      }

    let result = await User.create(newuser)
    res.status(200).json(result)
})

module.exports = router;