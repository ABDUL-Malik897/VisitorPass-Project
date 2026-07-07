const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : (req , file ,cb) => {
    cb(null , 'uploads/')
    },
    filename : (req ,file , cb) => {
        cb(
            null, 
            Date.now() +"_" + Math.round(Math.random() * 1e9) + path.extname(file.originalname)
        )
    }
})

const fileFilter = (req ,file, cb) => {
    const allowed = [
        "image/jpeg",
        "image/png",
        "image/jpg"
    ]
    if (allowed.includes(file.mimetype)) {
        cb(null , true)
    } else {
        cb(new Error('Only JPG and PNG images allowed'), false)
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits : {
        fileSize: 2 * 1024 * 1024
    }
})

module.exports = upload