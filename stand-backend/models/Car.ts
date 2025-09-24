import mongoose from "mongoose";

export interface ICar extends mongoose.Document {
  _id: Object;
  name: string;
  plate: string;
  engine: number;
  transmisson: number;
  suspension: number;
  brakes: number;
  armor: number;
  turbo: boolean;
  price: number;
  img: string;
}

const CarSchema = new mongoose.Schema<ICar>({
  name: { type: String, required: true },
  plate: { type: String, required: true },
  engine: { type: Number, required: true },
  transmisson: { type: Number, required: true },
  suspension: { type: Number, required: true },
  brakes: { type: Number, required: true },
  armor: { type: Number, required: true },
  turbo: { type: Boolean, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true }
});

export const Car = mongoose.model<ICar>("Car", CarSchema);
