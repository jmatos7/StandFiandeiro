import { Router } from "express";
import { Car } from "../models/Car";

const router = Router();

// Listar todos os carros
router.get("/carros", async (req, res) => {
  try {
    const cars = await Car.find();
    const carsWithId = cars.map(car => ({
      ...car.toObject(),
      id: car._id.toString()
    }));
    res.json(carsWithId);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar carros" });
  }
});

// Adicionar carro (staff)
router.post("/addCar", async (req, res) => {
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.json({ ...newCar.toObject(), id: newCar._id.toString() });
  } catch (err) {
    res.status(400).json({ error: "Erro ao adicionar carro" });
  }
});

// Remover carro (staff)
router.delete("/:id", async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Erro ao remover carro" });
  }
});


export default router;
