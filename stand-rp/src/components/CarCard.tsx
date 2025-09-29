import React from "react";
import "../styles/CarCard.scss";
import type { CarFormData } from "../types/Car";

interface CarCardProps {
  car: CarFormData;
  onClick?: () => void;  
}

function formatPrice(price: number) {
  return price.toLocaleString('pt-PT') + "€";
}

const CarCard: React.FC<CarCardProps> = ({ car, onClick }) => {
  return (
    <div className="car-card" onClick={onClick}>
      <img src={car.img} alt={car.name} loading="lazy"/>
      <h3>{car.name}</h3>
      <p>{formatPrice(car.price)}</p>
    </div>
  );
};

export default CarCard;
