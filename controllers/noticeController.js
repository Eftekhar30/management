const Notice = require('../models/notice');
const User = require('../models/user');

exports.getNotices = async (req, res) => {
    try {
        const notices = await Notice.find().sort({ createdAt: -1 });
        res.status(200).json(notices);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch notices" });
    }
};

exports.createNotice = async (req, res) => {
    const { title, content } = req.body;

    try {
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: "Author not found in database." });
        }

        const newNotice = new Notice({
            title,
            content,
            authorId: user._id,
            authorName: user.fullName
        });

        await newNotice.save();
        
        res.status(201).json({ 
            message: "Notice published successfully!", 
            notice: newNotice 
        });
    } catch (error) {
        console.error("Error creating notice:", error);
        res.status(500).json({ message: "Server error while publishing notice." });
    }
};