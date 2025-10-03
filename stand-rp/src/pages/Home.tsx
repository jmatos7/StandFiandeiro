import React, { useEffect, useState } from "react";
import CarCard from "../components/CarCard";
import CarDetail from "../components/CarDetail";
import type { CarFormData } from "../types/Car";
import "../styles/Home.scss";
import { API_URL } from "../config";

const Home: React.FC = () => {
  const [cars, setCars] = useState<CarFormData[]>([]);
  const [selectedCar, setSelectedCar] = useState<CarFormData | null>(null);

  // Carregar carros do JSON
  useEffect(() => {
    fetch(`${API_URL}/cars/carros`)
      .then((res) => res.json())
      .then((data: CarFormData[]) => {
        setCars(data);
      })
      .catch((err) => console.error("Erro ao carregar carros:", err));
  }, []);

  // Seleciona alguns carros em destaque (ex.: os 4 primeiros)
  const featuredCars = cars.slice(0, 4);

  return (
    <div className="home">
      {/* Banner */}
      <section className="home__banner">
        <h1>Bem-vindo ao Stand Fiandeiro</h1>
        <p>As melhores viaturas de Puerto Esperanza, sempre perto de ti.</p>
      </section>

      {/* Carros em destaque */}
      <section className="home__featured">
        <h2>Viaturas em destaque</h2>
        <div className="home__cars">
          {featuredCars.map((car) => (
            <div key={`car-${car.id}`} onClick={() => setSelectedCar(car)}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </section>

      {/* Popup de detalhes */}
      {selectedCar && (
        <CarDetail car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
    </div>
  );
};

export default Home;
