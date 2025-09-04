const multer = require("multer");
const path = require("path");
const fs = require("fs");

// directory
const uploadDir = path.join(__dirname, '../uploads');

//if directory not have then firstly create
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase();
    const filename = path.basename(file.originalname, ext).replace(/\s+/g, '-');
    
    console.log("Processing file:", filename);
    cb(null, `${filename}-${uniqueSuffix}${ext || '.png' || ".jpeg"}`);
  }
});

// 3. Add file validation
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(new Error('Only PNG and JPEG images are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

module.exports = { upload };