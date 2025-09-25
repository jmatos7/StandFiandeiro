import { Router } from "express";
import { Car } from "../models/Car";

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

export default router;
