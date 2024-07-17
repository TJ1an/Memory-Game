import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [score, setScore] = useState(0);
  const[bestScore, setBestScore] = useState(0);
  const [clickedPokemonIds, setClickedPokemonIds] = useState(new Set());
  const pokemonListId = generateRandomId();

  async function fetchAllData(ids) {
    try {
      const promises = ids.map(id => 
        axios.get(`${import.meta.env.VITE_API_URL}/pokemon/${id}`)
      );
      const results = await Promise.all(promises);
      const dataArray = results.map(response => response.data);
      setPokemonData(dataArray);
    } catch (error) {
      console.log(error);
    }
  }

  function generateRandomId() {
    const ids = new Set(); // Using a Set to avoid duplicates
    const numIds = 20; // Number of IDs you want to generate
    const maxId = 500; // Assuming Pokemon IDs range from 1 to 500
  
    while (ids.size < numIds) {
      const id = Math.floor(Math.random() * maxId) + 1; // Generate a random ID
      ids.add(id); // Add the ID to the Set (automatically avoids duplicates)
    }
  
    return Array.from(ids); // Convert Set back to an array and return
  }

  function shuffle(array) {
    // Creating a shallow copy of the array before shuffling
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  function handleCardClick(pokemon) {
    if (!clickedPokemonIds.has(pokemon.id)) {
      setScore(prevScore => prevScore + 1);
      setClickedPokemonIds(prevIds => new Set(prevIds).add(pokemon.id));
    } else {
      if (score > bestScore) {
        setBestScore(score);
      }
      setScore(0);
      setClickedPokemonIds(new Set());
    }
    setPokemonData(prevData => shuffle([...prevData]));
  }

  useEffect(() => {
    fetchAllData(pokemonListId);
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold pb-10 pt-5 text-center">Memory Game</h1>
      <p className="text-xl text-center pb-1">Score: {score}</p>
      <p className="text-xl text-center pb-10">Best Score: {bestScore}</p>
      <div className="px-4">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-10">
          {pokemonData.map(pokemon => (
            <Card 
              key={pokemon.id} 
              name={pokemon.name} 
              image={pokemon.sprites.front_default} 
              onClick={() => handleCardClick(pokemon)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

