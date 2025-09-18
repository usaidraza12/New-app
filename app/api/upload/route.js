import multer from "multer";
import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export async function POST(req) {
  const res = { setHeader: () => {} };
  await runMiddleware(req, res, upload.single("image"));

  const filePath = `/uploads/${req.file.filename}`;

  return NextResponse.json({ url: filePath });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
