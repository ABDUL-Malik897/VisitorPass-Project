const User = require('../models/User-model')

const requireAdmin = async (req ,res ,next) => {
    try {
        const user = await User.findById(req.user._id)
        if (!user) {
            return res.status(401).json({
                error : "User not found"
            })
        }
        if (user.role !== "admin") {
            return res.status(403).json({
                error : "Admin access only"
            })
        }
        next()
    } catch (error) {
        res.status(500).json({
            error : error.message
        })
    }
}

module.exports = requireAdmin