import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import dotenv from "dotenv"

dotenv.config();
const apiKey = process.env.API_KEY;

const router = express.Router();


// Mock database
const places = [
];

// retorna a lista de lugares cadastrados no mock
router.get('/', (req, res) => {
  res.send(places);
});

//busca um lugar pelo id
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const findPlace = places.find((place) => place.id === id);

  res.send(findPlace);
});

//deleta um lugar pelo id
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  places = places.filter((place) => place.id !== id);

  res.send(`${id} deleted from database`);
});

//atualiza um lugar
router.patch('/:id', (req, res) => {
  const { id } = req.params;

  const { title, description, address } = req.body;

  const place = places.find((place) => place.id === id);

  if (title) place.title = title;
  if (description) place.description = description;
  if (address) place.address = address;

  res.send(`User with the ${id} has been updated`);
});

//cria um lugar
router.post('/', async (req, res) => {

  // //envia o corpo da requisição
  const place = req.body;
  places.push({ ...place, id: uuidv4() });

  res.send(`${place.address} foi criado`);
  

  const address = place.address;
  geocodeAddress(address);


  async function geocodeAddress(address) {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;
  
    try {
      const response = await axios.get(url);
      console.log(response, "response")
      if (response.data.status === 'OK') {

        const location = response.data.results[0].geometry.location;
        console.log(`Latitude: ${location.lat}, Longitude: ${location.lng}`);
      } else {
        console.log('Geocoding error:', response.data.status);
      }
    } catch (error) {
      console.error('Error making request:', error);
    }
  }  
});


export default router;


