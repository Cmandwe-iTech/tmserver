import multer from "multer";
import path from "path";

// Set up storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
  }
});

// Improved file filter for handling multiple file types including videos
const fileFilter = (req, file, cb) => {
  const filetypes = /mp4|mov|avi|mkv|wmv|flv|jpeg|jpg|png|gif|pdf|docx/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = file.mimetype.startsWith('video/') ||
                   file.mimetype.startsWith('image/') ||
                   file.mimetype === 'application/pdf' ||
                   file.mimetype === 'application/msword' ||
                   file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type!'));
  }
};

// Set up multer configuration with storage and limits
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 100000000 }, // Limit file size to 100MB or adjust as needed
  fileFilter: fileFilter
});

export default upload;
