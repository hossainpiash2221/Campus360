// import express from "express";
// import send_reservation from "../controller/reservation.js";

// const router = express.Router();

// router.post("/send", send_reservation);

// export default router;

import express from "express";
import { send_reservation, get_reservations } from "../controller/reservation.js";

const router = express.Router();

router.post("/send", send_reservation);
router.get("/", get_reservations); // ✅ Add this line to handle GET requests

export default router;
