import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, path.join(__dirname, '../public/img/pets'));
    } else {
      cb(null, path.join(__dirname, '../public/img/documents'));
    }
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Create uploader instance
const upload = multer({ storage });

export default upload;
