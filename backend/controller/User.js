import { User } from "../model/UserModel.js";

const registerUser = async(req, res) => {
    try {
        const {user} = req.body
        console.log(user)

    
        if(!user){
            return res.status(403).json({
                success: false,
                message: "Enter Username",
            })
        }
    
        const existingUser = await User.findOne({ user })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        await User.create({
            user
        })

        return res.status(200).json({
            success: true,
            message: "User created",
        })
    
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Error occured during username entry. Try Again"
        })
    }
}

const showAlluser = async(req, res) => {
    try {
        const alluser = await User.find()

        if(!alluser)
            return res.status(401).json({
                success: false,
                message: "No user found",
            })
        
        return res.status(200).json({
            success: true,
            message: "users found and displayed successfully",
            data: alluser
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Cannot fetch user data while getting all users.",
            error: error.message
        })
    }
}

export{
    showAlluser,
    registerUser
}