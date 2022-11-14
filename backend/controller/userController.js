import User from "../model/userModel";
import bcrypt from 'bcrypt'

export const getAllUser = async (req, res, next) => {
    let users;
    try {
         users = await User.find();
    } catch (error) {
        console.log(error)
    }
    
    if (!users) {
        return res.status(400).json({message:"No users found"})
    } else {
        return res.status(200).json({users});
    }
}


export const signupUser = async(req,res,next) => {
    
    const { name, email, password } = req.body;
    const existinguser = await User.findOne({ email})
    
    if (existinguser) {
        return res.status(400).send({ message: "User already exist" })
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt)


    const user = new User({
        name:name,
        email:email,
        password: hashPassword,
        blogs:[]
    })
    try {
        const userData = await user.save();
        res.status(200).send({userData})
    } catch (error) {
        res.status(400).send({message:error})
    }
}

export const loginUser = async (req,res,next) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send({message:"User not found"})
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
        return res.status(400).send({message:"Password not validate"})
    }

    try {
        res.status(200).send({ user });
    } catch (error) {
        res.status(400).send(error)
    }
}