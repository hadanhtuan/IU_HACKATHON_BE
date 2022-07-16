const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dhshtvtrl',
    api_key: '779359292484378',
    api_secret: 'o0_WRq0vULdf3lMZvGOBuzA5KLE'
})

module.exports = cloudinary
