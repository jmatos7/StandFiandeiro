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
  <div
    className="car-card"
    onClick={!car.sold ? onClick : undefined}
    style={{ opacity: car.sold ? 0.5 : 1, cursor: car.sold ? "not-allowed" : "pointer" }}
  >
    <img src={car.img} alt={car.name} loading="lazy" />
    <h3>{car.name}</h3>
    <p>{formatPrice(car.price)}</p>
    {car.sold && <div className="sold-label">Vendido</div>}
  </div>
);

};

export default CarCard;
