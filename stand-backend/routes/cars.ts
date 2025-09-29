import { Router,Request,Response } from "express";
import { Car } from "../models/Car";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "standfiandeiro", // pasta na cloud
      format: ["png","webp","jpg"],            // ou 'jpg', 'webp', etc
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
    };
  },
});

const upload = multer({ storage });

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
