import express from "express";
const router = express.Router();
router.get("/user", (req, res) => {
  res.json({
    message: "Welcome to User Routes",
  });
});

export const UserRoutes = router;
