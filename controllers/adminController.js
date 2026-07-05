const User = require('../models/user')

exports.updateUserRole = async (req,res) =>{
    const {email, newRole} = req.body

    const allowedRoles = ['Student', 'CR', 'Admin']
    if(!allowedRoles.includes(newRole)){
        return res.status(400).json({message: "Invalid Role"})
    }

    try{
        if (req.user.email === email && newRole !== 'Admin') {
            return res.status(400).json({ message: "Safety lock: You cannot revoke your own Admin status." });
        }

        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { role: newRole },
            { new: true }
        ).select('-password')

        if(!updatedUser){
            return res.status(404).json({message: "User not found with that email"})
        }

        res.status(200).json({
            message: `Successfully reassigned ${updatedUser.fullName} to role: ${newRole}`,
            user: updatedUser})
    } catch(error){
        res.status(500).json({ message: "Database update failed internally." });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        // .select('-password') ensures we NEVER send hashed passwords to the frontend
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users from database." });
    }
};