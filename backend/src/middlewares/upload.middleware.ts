import multer from "multer";

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (
    _: any,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
export { upload };
