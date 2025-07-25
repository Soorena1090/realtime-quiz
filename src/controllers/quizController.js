const pool = require('../database/mysqlConnect');

exports.createQuiz = async (req,res) => {
    const { title, description } = req.body;
    const userId = req.user;

    try {
        const [result] = await pool.execute("INSERT INTO quizzes( title, description) VALUES (? , ?)", [title, description]);
        res.status(201).json({ message: "quiz created", quizId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "database error"});
    };
};

exports.getAllQuizzes = async (req,res) => {
    try {
        const [rows] = await pool.execute("SELECT * FROM quizzes")
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "faild to get quiz"})
    };
};

