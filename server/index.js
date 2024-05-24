import express from 'express';
import bodyParser from 'body-parser';
import placesRoutes from './routes/places.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use('/places', placesRoutes);

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`),
);
