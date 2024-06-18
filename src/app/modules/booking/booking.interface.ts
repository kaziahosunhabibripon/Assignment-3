import { Types } from "mongoose";

export type TVehicleType =
  | "car"
  | "truck"
  | "SUV"
  | "van"
  | "motorcycle"
  | "bus"
  | "electricVehicle"
  | "hybridVehicle"
  | "bicycle"
  | "tractor";

export type TBooking = {
  customer: Types.ObjectId;
  slot: Types.ObjectId;
  service: Types.ObjectId;
  vehicleType: TVehicleType;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
};
