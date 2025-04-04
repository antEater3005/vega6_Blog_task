import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

export const upload = multer({ storage });

export const deleteFile = (filename) => {
  try {
    const filePath = path.join(process.cwd(), filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`File deleted: ${filename}`);
      return true;
    } else {
      console.warn(`File not found: ${filename}`);
      return false;
    }
  } catch (error) {
    console.error(`Error deleting file ${filename}:`, error);
    return false;
  }
};
