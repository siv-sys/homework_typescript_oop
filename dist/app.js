"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
// Initialize the express application
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware to parse incoming JSON bodies
app.use(express_1.default.json());
// Root endpoint just for quick verification
app.get('/', (req, res) => {
    res.send('User API is up and running!');
});
// Configure API routes
// 1. mvc (Mounting routes representing views to controller actions)
app.use('/api/users', userRoutes_1.default);
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
