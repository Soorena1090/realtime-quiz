const pool = require("../database/mysqlConnect");

createQuiz = async (req, res) => {
  const { title, description } = req.body;

  try {
    const [result] = await pool.execute(
      "INSERT INTO quizzes( title, description) VALUES (? , ?)",
      [title, description]
    );
    res.status(201).json({ message: "quiz created", quizId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "database error" });
  }
};

getAllQuizzes = async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM quizzes");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "faild to get quiz" });
  }
};

quizById = async (req, res) => {
  const { quizId } = req.body;

  try {
    const [rows] = await pool.execute("SELECT * FROM quizzes WHERE id = ? ", [
      quizId,
    ]);

    if (rows.length === 0) {
      return res.status(500).json({ error: "quiz not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

module.exports = {
    quizById,
    getAllQuizzes,
    createQuiz
};