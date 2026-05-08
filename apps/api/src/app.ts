import cors from 'cors';
import express from 'express';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (request, response) => {
  return response.json({
    status: 'ok',
    message: 'Parking Register API is running',
  });
});