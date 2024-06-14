import { model, Schema } from "mongoose";
import { TService } from "./service.interface";

const serviceSchema = new Schema<TService>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

serviceSchema.pre("save", function (next) {
  const service = this;
  if (service.isModified("name")) {
    service.name = service.name.toLowerCase();
  }
  next();
});
export const Service = model<TService>("Service", serviceSchema);
