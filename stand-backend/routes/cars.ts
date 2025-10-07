import { Router } from "express";
import { Car } from "../models/Car";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";


console.log("Cloudinary config:", process.env.CLOUD_NAME, process.env.API_KEY ? "✅" : "❌", process.env.API_SECRET ? "✅" : "❌");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "standfiandeiro",
    public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
    resource_type: "image", // garante só imagens
  }),


});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // limite de 5MB
  fileFilter: (req, file, cb) => {
    // aceita apenas imagens
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Apenas imagens são permitidas"));
    }
    cb(null, true);
  },
});

const router = Router();

// Listar todos os carros
router.get("/carros", async (req, res) => {
  try {
    const cars = await Car.find();
    const carsWithId = cars.map(car => ({
      ...car.toObject(),
      id: car._id.toString(),
    }));
    res.json(carsWithId);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar carros" });
  }
});

// Adicionar carro
router.post("/carros", async (req, res) => {
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.status(201).json({ ...newCar.toObject(), id: newCar._id.toString() });
  } catch (err) {
    res.status(400).json({ error: "Erro ao adicionar carro" });
  }
});

// Remover carro
router.delete("/carros/:id", async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({ error: "Carro não encontrado" });
    }
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: "Erro ao remover carro" });
  }
});

router.patch("/carros/:id/sell", async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { sold: true }
    );
    if (!car) return res.status(404).json({ message: "Carro não encontrado" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: "Erro ao marcar carro como vendido" });
  }
});


router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum ficheiro enviado" });
    }

    res.json({ url: req.file.path });
  } catch (err) {
    console.error("Erro no upload:", err);
    res.status(500).json({ error: "Erro no upload" });
  }
});


export default router;
