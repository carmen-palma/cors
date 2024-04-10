const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Obtener todos los personajes
app.get('/characters', async (req, res) => {
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/character');
      res.json(response.data.results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Obtener un personaje por nombre
  app.get('/characters/:name', async (req, res) => {
    const characterName = req.params.name;
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${characterName}`);
      if (response.data.results.length === 0) {
        res.status(404).json({ message: 'Character not found' });
      } else {
        res.json(response.data.results[0]);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });