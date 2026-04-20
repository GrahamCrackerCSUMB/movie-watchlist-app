console.log("FILE IS RUNNING"); 

//import packages
import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

//for Express to get values using POST method
app.use(express.urlencoded({extended:true}));

//setting up database connection pool
const pool = mysql.createPool({
    host: "bqmayq5x95g1sgr9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "xmp5mr6euvg1wfgv",
    password: "c86t00ploqkdv6qy",
    database: "lvrxrzvw9a1cobbu",
    connectionLimit: 10,
    waitForConnections: true
});

//New User Get and Post
app.get('/newUser', (req, res) => {
    res.render('newUser');
});

app.post('/newUser', async (req, res) => {
    let { username, email, password} = req.body;

    let sql = `
        INSERT INTO users (username, email, password)
        VALUES (?, ?, ?)
    `;

    await pool.query(sql, [username, email, password]);

    res.redirect('/index');
});


//dbTest
app.get("/dbTest", async (req, res) => {
    let sql = "SELECT CURDATE();";
    const [rows] = await pool.query(sql);
    res.send(rows);
});


app.listen(3000, () => {
    //Print message to see it works
    console.log("Server started on port 3000");
});