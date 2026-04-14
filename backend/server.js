const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST || "localhost",
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "",
  database: process.env.DATABASE_NAME || "bon_films",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const jwtSecret = process.env.JWT_SECRET || "default-secret-change-me";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Missing or invalid authorization header" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

app.post("/api/auth/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const [rows] = await pool.execute("SELECT id FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword],
    );

    return res
      .status(201)
      .json({ message: "User registered", userId: result.insertId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to register user" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const [rows] = await pool.execute(
      "SELECT id, email, password FROM users WHERE email = ?",
      [email],
    );
    if (!rows.length) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: "8h",
    });
    return res.json({
      token,
      user: { uid: String(user.id), email: user.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to login" });
  }
});

app.post("/api/auth/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  return res.json({
    message: "If this account exists, password reset instructions were sent.",
  });
});

app.get("/api/films", async (req, res) => {
  try {
    const [films] = await pool.execute(
      "SELECT id, title, genre, studio, director, topBilling, synopsis FROM films",
    );
    res.json(films);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to load films" });
  }
});

app.get("/api/film/:id/reviews", async (req, res) => {
  const filmId = req.params.id;
  try {
    const [rows] = await pool.execute(
      `SELECT r.id, r.rating, r.review, r.userReviewedId, r.dateReviewed,
              f.id AS filmId, f.title, f.genre, f.studio, f.director, f.topBilling, f.synopsis
       FROM reviews r
       JOIN films f ON r.filmId = f.id
       WHERE r.filmId = ?`,
      [filmId],
    );

    const reviews = rows.map((row) => ({
      id: row.id,
      rating: row.rating,
      review: row.review,
      userReviewedId: row.userReviewedId,
      dateReviewed: row.dateReviewed,
      film: {
        id: row.filmId,
        title: row.title,
        genre: row.genre,
        studio: row.studio,
        director: row.director,
        topBilling: row.topBilling,
        synopsis: row.synopsis,
        reviews: null,
      },
    }));
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to load film reviews" });
  }
});

app.post("/api/film/create", authMiddleware, async (req, res) => {
  const { title, genre, studio, director, topBilling, synopsis } = req.body;
  try {
    const [result] = await pool.execute(
      "INSERT INTO films (title, genre, studio, director, topBilling, synopsis) VALUES (?, ?, ?, ?, ?, ?)",
      [title, genre, studio, director, topBilling, synopsis],
    );
    res
      .status(201)
      .json({
        id: result.insertId,
        title,
        genre,
        studio,
        director,
        topBilling,
        synopsis,
        reviews: null,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create film" });
  }
});

app.get("/api/reviews", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT r.id, r.rating, r.review, r.userReviewedId, r.dateReviewed, f.title
       FROM reviews r
       JOIN films f ON r.filmId = f.id`,
    );
    const reviews = rows.map((row) => ({
      id: row.id,
      rating: row.rating,
      review: row.review,
      userReviewedId: row.userReviewedId,
      title: row.title,
      dateReviewed: row.dateReviewed,
    }));
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to load reviews" });
  }
});

app.get("/api/review/:id", async (req, res) => {
  const reviewId = req.params.id;
  try {
    const [rows] = await pool.execute(
      `SELECT r.id, r.rating, r.review, r.userReviewedId, r.dateReviewed,
              f.id AS filmId, f.title, f.genre, f.studio, f.director, f.topBilling, f.synopsis
       FROM reviews r
       JOIN films f ON r.filmId = f.id
       WHERE r.id = ?`,
      [reviewId],
    );
    if (!rows.length) {
      return res.status(404).json({ message: "Review not found" });
    }
    const row = rows[0];
    res.json({
      id: row.id,
      rating: row.rating,
      review: row.review,
      userReviewedId: row.userReviewedId,
      dateReviewed: row.dateReviewed,
      film: {
        id: row.filmId,
        title: row.title,
        genre: row.genre,
        studio: row.studio,
        director: row.director,
        topBilling: row.topBilling,
        synopsis: row.synopsis,
        reviews: null,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to load review" });
  }
});

app.post("/api/review/create", authMiddleware, async (req, res) => {
  const { rating, review, userReviewedId, film } = req.body;
  if (!film?.id) {
    return res.status(400).json({ message: "Film ID is required" });
  }

  try {
    const [result] = await pool.execute(
      "INSERT INTO reviews (rating, review, userReviewedId, filmId) VALUES (?, ?, ?, ?)",
      [rating, review, userReviewedId, film.id],
    );
    res
      .status(201)
      .json({
        id: result.insertId,
        rating,
        review,
        userReviewedId,
        film,
        dateReviewed: new Date(),
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create review" });
  }
});

app.put("/api/review/:id", authMiddleware, async (req, res) => {
  const reviewId = req.params.id;
  const { rating, review } = req.body;
  try {
    await pool.execute(
      "UPDATE reviews SET rating = ?, review = ? WHERE id = ?",
      [rating, review, reviewId],
    );
    res.json({ id: reviewId, rating, review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to update review" });
  }
});

app.delete("/api/review/:id", authMiddleware, async (req, res) => {
  const reviewId = req.params.id;
  try {
    await pool.execute("DELETE FROM reviews WHERE id = ?", [reviewId]);
    res.json({ message: "Review deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to delete review" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
