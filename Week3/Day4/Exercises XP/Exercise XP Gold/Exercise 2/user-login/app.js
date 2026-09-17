import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const app = express();
app.use(express.json());

let db = [{ email: "user@example.com", password: "$2b$10$..." }]; // Simulated database


app.post("/api/register", async (req, res) => {
    const newUser = req.body;
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    db.push({ email: newUser.email, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully" });

})

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const user = db.find(u => u.email === email)
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    } else {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        } else {
            const token = jwt.sign({ email: user.email }, "secretKey", { expiresIn: "1h" });
            res.json({ token });
        }
    }
    
})

app.get("/api/profile", async (req, res) => {
     const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, "secretKey");

        const user = db.find(u => u.email === decoded.email);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({
            email: user.email
        });

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
})


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});