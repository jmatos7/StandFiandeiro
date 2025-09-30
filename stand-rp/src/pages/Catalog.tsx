import React, { useState, useEffect } from "react";
import CarCard from "../components/CarCard";
import CarDetail from "../components/CarDetail";
import AddCarForm from "../components/AddCarForm";
import "../styles/Catalog.scss";
import type { CarFormData } from "../types/Car";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { API_URL } from "../config";

interface CatalogProps {
  userRole: "guest" | "staff";
}

const Catalog: React.FC<CatalogProps> = ({ userRole }) => {
  const [cars, setCars] = useState<CarFormData[]>([]);
  const [selectedCar, setSelectedCar] = useState<CarFormData | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);

  // Carregar carros do backend
  useEffect(() => {
    fetch(`${API_URL}/cars/carros`)
      .then(res => res.json())
      .then((data: CarFormData[]) => {
        setCars(data);
        const prices = data.map(c => c.price);
        setPriceRange([Math.min(...prices), Math.max(...prices)]);
      })
      .catch(err => console.error("Erro ao carregar carros:", err));
  }, []);

  // Adicionar carro
  const handleAddCar = async (carData: Omit<CarFormData, "id">) => {
    try {
      const res = await fetch(`${API_URL}/cars/carros`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carData),
      });
      const newCar = await res.json();
      setCars([...cars, newCar]);
    } catch (err) {
      console.error("Erro ao adicionar carro:", err);
    }
  };

  // Remover carro
  const handleRemoveCar = async (id: number) => {
    try {
      await fetch(`${API_URL}/cars/carros/${id}`, { method: "DELETE" });
      setCars(cars.filter(c => c.id !== id));
    } catch (err) {
      console.error("Erro ao remover carro:", err);
    }
  };

  // Filtrar carros pelo preço
  const filteredCars = cars.filter(
    car => car.price >= priceRange[0] && car.price <= priceRange[1]
  );

  return (
    <div className="catalog">
      {/* Banner */}
      <section className="catalog__banner">
        <h1>Catálogo de Carros</h1>
        <p>Encontra o carro perfeito para ti</p>
      </section>

      {/* Filtros */}
      <button
        className="toggle-filters-button"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? "Esconder filtros" : "Mostrar filtros"}
      </button>

      {showFilters && (
        <section className="catalog__filters">
          <h3>Filtrar por preço</h3>
          <div className="filter-controls">
            <input
              type="number"
              value={priceRange[0]}
              onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
            />
            <input
              type="number"
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
            />
          </div>
          <Slider
            range
            min={Math.min(...cars.map(c => c.price), 0)}
            max={Math.max(...cars.map(c => c.price), 100000)}
            value={priceRange}
            onChange={val => setPriceRange(val as [number, number])}
          />
        </section>
      )}


      {/* Adicionar carro (staff) */}
      {userRole === "staff" && (
        <section className="catalog__add-car">
          <h2>Adicionar Carro</h2>
          <AddCarForm onAddCar={handleAddCar} />
        </section>
      )}

      {/* Lista de carros */}
      <section className="catalog__list">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div key={`car-${car.id}`} className="catalog__item">
              <div onClick={() => setSelectedCar(car)}>
                <CarCard car={car} />
              </div>
              {userRole === "staff" && (
                <button
                  className="remove-car-button"
                  onClick={() => handleRemoveCar(car.id)}
                >
                  Remover
                </button>
              )}
            </div>
          ))

        ) : (
          <p>Nenhum carro encontrado neste intervalo de preço.</p>
        )}
      </section>

      {/* Detalhes do carro */}
      {selectedCar && <CarDetail car={selectedCar} onClose={() => setSelectedCar(null)} />}
    </div>
  );
};

export default Catalog;
