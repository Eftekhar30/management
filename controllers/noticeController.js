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
        // --- DIAGNOSTIC LOGS ---
        console.log("Step 1: Received Notice Data ->", { title, content });
        console.log("Step 2: Token User Data (req.user) ->", req.user);

        // FAILSAFE: Check both .id and ._id depending on how your JWT was signed
        const targetId = req.user.id || req.user._id;
        console.log("Step 3: Extracted Target ID ->", targetId);

        if (!targetId) {
            console.log("❌ ERROR: No ID found in the token!");
            return res.status(401).json({ message: "Backend Error: Token is missing user ID." });
        }

        // --- DATABASE LOOKUP ---
        const user = await User.findById(targetId);
        console.log("Step 4: Did we find the user in DB? ->", user ? "YES" : "NO");
        
        if (!user) {
            return res.status(404).json({ message: "Backend Error: Author not found in database." });
        }

        // --- SAVE NOTICE ---
        const newNotice = new Notice({
            title,
            content,
            authorId: user._id,
            authorName: user.fullName || 'Admin'
        });

        await newNotice.save();
        console.log("✅ Step 5: SUCCESS! Notice saved to MongoDB.");
        
        res.status(201).json({ 
            message: "Notice published successfully!", 
            notice: newNotice 
        });
        
    } catch (error) {
        // This catches severe MongoDB connection errors
        console.error("❌ FATAL CATCH BLOCK ERROR:", error);
        res.status(500).json({ 
            message: "Server error while publishing notice.", 
            error: error.message 
        });
    }
};