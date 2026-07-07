const CheckLog = require('../models/Check-Model')
const visitorModel = require('../models/visitor-Model')

exports.scanQR = async (req ,res) => {
    try {
        const { visitorId } = req.body

        const visitor = await visitorModel.findById(visitorId)

        if (!visitor) {
            return res.status(404).json({
                error : "Visitor not found"
            })
        }

        const latestLog = await CheckLog.findOne({
            Visitor : visitorId
        }).sort({ createdAt : -1 })

        if (!latestLog || latestLog.CheckOut) {
            const log = await CheckLog.create({
                Visitor : visitorId,
                CheckIn : new Date(),
                Status : "Checked In"
            })

            return res.status(200).json({
                message : "Visitor Checked In",
                log
            })
        }

        latestLog.CheckOut = new Date()
        latestLog.Status = "Checked Out"

        await latestLog.save()

        res.status(200).json({
            message : "Visitor Checked Out",
            log : latestLog
        })
    } catch (error) {
        res.status(500).json({
            error : error.message
        })
    }
};

exports.getLog = async (req ,res) => {
    try {
        const logs = await CheckLog.find().sort({ createdAt : -1 })
        
        res.status(200).json(logs)
    } catch (error) {
        res.status(500).json({
            error : error.message
        })
    }
};

exports.getStats = async (req ,res) => {
    try {
        const today = new Date()
        today.setHours(0,0,0,0)
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        const checkedIn = await CheckLog.countDocuments({
            CheckIn: {
                $gte : today,
                $lt : tomorrow
            }
        })

        const checkedOut = await CheckLog.countDocuments({
            CheckOut : {
                $gte : today,
                $lt : tomorrow
            }
        })

        const inside = await CheckLog.countDocuments({
            CheckOut : null
        })

        res.status(200).json({
            checkedIn,checkedOut,inside
        })

    } catch (error) {
        res.status(500).json({
            error : error.message
        })
    }
}