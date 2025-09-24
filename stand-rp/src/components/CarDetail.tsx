import React from "react";
import "../styles/CarDetail.scss";
import type { CarFormData } from "../types/Car";

interface CarDetailProps {
  car: CarFormData | null;
  onClose: () => void;
}

function formatPrice(price: number) {
  return price.toLocaleString('pt-PT') + "€";
}

const CarDetail: React.FC<CarDetailProps> = ({ car, onClose }) => {
  if (!car) return null;

  return (
    <div className="car-detail__overlay" onClick={onClose}>
      <div className="car-detail" onClick={(e) => e.stopPropagation()}>
        <button className="car-detail__close" onClick={onClose}>
          ✕
        </button>
        <img src={car.img} alt={car.name} loading="lazy"/>
        <h2>{car.name}</h2>
        <p><strong>Matricula: </strong> {car.plate}</p>
        <p><strong>Motor: Nivel:</strong> {car.engine}</p>
        <p><strong>Suspensao: Nivel:</strong> {car.suspension}</p>
        <p><strong>Transmissao: Nivel:</strong> {car.transmisson}</p>
        <p><strong>Travões: Nivel:</strong> {car.brakes}</p>
        <p><strong>Armadura: Nivel:</strong> {car.armor}</p>
        <p><strong>Turbo:</strong> {car.turbo ? "Sim" : "Não"}</p>
        <p><strong>Preço:</strong> {formatPrice(car.price)}</p>
        <p>Lorem ipsum dolor sit amet, descrição completa do carro aqui.</p>
      </div>
    </div>
  );
};

export default CarDetail;
