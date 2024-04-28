import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { LayoutComponents } from "../../components/LayoutComponents";


const Home = () => {
  const [message, setMessage] = useState('');
  const [responseText, setResponseText] = useState('');
  const [status, setStatus] = useState('');
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const savedRecipesFromStorage = JSON.parse(localStorage.getItem('savedRecipes'));
    if (savedRecipesFromStorage) {
      setSavedRecipes(savedRecipesFromStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  // Certifique-se de fornecer a URL correta do Google AI
  const genAI = new GoogleGenerativeAI("AIzaSyC-hXZ_KT2zkjJ9WC-fBDp3DFnEY07FhkI");

  const sendMessage = async () => {
    if (!message) return;

    setStatus('Preparando a receita...');

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(message, { includeRecipeName: true });
      const response = await result.response;
      const text = await response.text();

      setResponseText(text);
      setStatus('');
      setMessage('');
    } catch (error) {
      console.error('Erro ao processar a solicitação:', error);
      setStatus('Erro, tente novamente mais tarde...');
    }
  };

  return (
    <LayoutComponents>
      <div className="box-questions">
        <div className="header">
          <p className="title">Receita-IA</p>
        </div>
        <p className="status-message">{status}</p>
        <div className="footer">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ingredientes..."
            className="input-message"
          />
          <button className="btn-submit" onClick={sendMessage}>Enviar</button>
        </div>
        <div className={responseText ? "response-text has-content" : "response-text"}>
          {responseText}
        </div>

        <div className="recipe-list">
          <ul>
            {savedRecipes.map((recipe, index) => (
              <li key={index} className="recipe-list-item">
                <div>{recipe.name}</div>
                <div>{recipe.description}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </LayoutComponents>
  );
};

export default Home;
