import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [statusDelete, setStatusDelete] = useState(false);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, [statusDelete]);

  async function handleAddRepository() {
    const response = await api.post('repositories', { 
      "title" : `Novo desafio ${Date.now()}`, 
      "url" : "http://github.com/...", 
      "techs" : ["Node.js", "..."]
    });

    const repositorie = response.data;

    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if(response.status == 204){
      setStatusDelete(!statusDelete);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repositorie => 
        <li key={repositorie.id}>
          {repositorie.title}

          <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
          </button>
        </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
