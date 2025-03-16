import express from "express";

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  console.log(username, email, password);

  return res.status(201).json({ message: "user registered" });
});

export default router;
