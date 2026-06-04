//handles signup and login logic

import bcrypt from "bcryptjs";
import db from "../config/db.js";

export const signup = (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.json({ success: false, message: "All fields are required" });
  }

  if (password.length < 8) {
    return res.json({ success: false, message: "Password must be at least 8 characters long" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.json({ success: false, message: "Server error" });

    if (results.length > 0) {
      return res.json({ success: false, message: "Email already in use" });
    }

    const hashed = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, hashed],
      (err) => {
        if (err) return res.json({ success: false, message: "Insert failed" });

        return res.json({ success: true, message: "Account created successfully" });
      }
    );
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Email and password are required" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.json({ success: false, message: "Server error" });

    if (results.length === 0) {
      return res.json({ success: false, message: "Email or password is incorrect" });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.json({ success: false, message: "Email or password is incorrect" });
    }

    return res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  });
};