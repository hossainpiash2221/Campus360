import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";


export const send_reservation = async (req, res, next) => {
  const { firstName, lastName, email, date, time, phone } = req.body;
  if (!firstName || !lastName || !email || !date || !time || !phone ) {
    return next(new ErrorHandler("Please Fill Full Reservation Form!", 400));
  }

  try {
    await Reservation.create({ firstName, lastName, email, date, time, phone });
    res.status(201).json({
      success: true,
      message: "Reservation Sent Successfully!",
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }

    // Handle other errors
    return next(error);
  }
};

export const get_reservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({});
    res.status(200).json(reservations);
  } catch (error) {
    return next(error);
  }
};



// Optionally export as an object
export default {
  send_reservation,
  get_reservations,
};
