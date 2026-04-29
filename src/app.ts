import express, { Application, Request, Response } from 'express';
import userRoutes from './routes/userRoutes';

// Initialize the express application
const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON bodies
app.use(express.json());

// Root endpoint just for quick verification
app.get('/', (req: Request, res: Response) => {
  res.send('User API is up and running!');
});

// Configure API routes
// 1. mvc (Mounting routes representing views to controller actions)
app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
