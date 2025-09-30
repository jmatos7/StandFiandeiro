import React, { useState } from "react";
import type { CarFormData } from "../types/Car";
import { API_URL } from "../config";

interface AddCarFormProps {
  onAddCar: (car: Omit<CarFormData, "id">) => void; // ID será gerado no backend
}

const AddCarForm: React.FC<AddCarFormProps> = ({ onAddCar }) => {
  const [name, setName] = useState("");
  const [plate, setPlate] = useState("");
  const [engine, setEngine] = useState("");
  const [transmisson, setTransmisson] = useState("");
  const [suspension, setSuspension] = useState("");
  const [brakes, setBrakes] = useState("");
  const [armor, setArmor] = useState("");
  const [turbo, setTurbo] = useState(false);
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !plate || !engine || !transmisson || !suspension || !brakes || !armor || !price || !img) {
      alert("Preenche todos os campos!");
      return;
    }

    onAddCar({
      name,
      plate,
      engine: parseInt(engine),
      transmisson: parseInt(transmisson),
      suspension: parseInt(suspension),
      brakes: parseInt(brakes),
      armor: parseInt(armor),
      turbo,
      price: parseInt(price),
      img,
    });

    setName("");
    setPlate("");
    setEngine("");
    setTransmisson("");
    setSuspension("");
    setBrakes("");
    setArmor("");
    setTurbo(false);
    setPrice("");
    setImg("");
  };

  return (
    <form className="add-car-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Nome do Carro" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Matrícula" value={plate} onChange={(e) => setPlate(e.target.value)} />
      <input type="number" placeholder="Motor" value={engine} onChange={(e) => setEngine(e.target.value)} />
      <input type="number" placeholder="Transmissão" value={transmisson} onChange={(e) => setTransmisson(e.target.value)} />
      <input type="number" placeholder="Suspensão" value={suspension} onChange={(e) => setSuspension(e.target.value)} />
      <input type="number" placeholder="Travões" value={brakes} onChange={(e) => setBrakes(e.target.value)} />
      <input type="number" placeholder="Blindagem" value={armor} onChange={(e) => setArmor(e.target.value)} />
      <label>
        Turbo:
        <input type="checkbox" checked={turbo} onChange={(e) => setTurbo(e.target.checked)} />
      </label>
      <input type="number" placeholder="Preço (€)" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const formData = new FormData();
            formData.append("image", file);

            fetch(`${API_URL}/cars/upload`, {
              method: "POST",
              body: formData,
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("Upload bem-sucedido:", data);
                setImg(data.url); // URL devolvido pelo backend
              })
              .catch((err) => console.error("Erro no upload:", err));
          }
        }}
      />


      {img && <img src={img} alt="Preview" width="150" style={{ marginTop: "10px" }} />}

      <button type="submit">Adicionar Carro</button>
    </form>
  );
};

export default AddCarForm;
