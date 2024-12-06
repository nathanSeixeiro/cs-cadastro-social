import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "uploads")); // Diretório correto
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}${ext}`;
    cb(null, fileName);
  },
});

// Função para validar o tipo do arquivo
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Tipos de arquivos permitidos
  const allowedMimes = ["image/jpeg", "image/png", "image/gif"];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true); // Aceitar o arquivo
  } else {
    cb(null, false); // Rejeitar o arquivo
  }
};

// Configuração do multer com validação
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite de 5MB (opcional)
  },
});

export default upload;