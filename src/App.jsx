import React from 'react';
import ReactDOM from 'react-dom';
import { AppRouter } from "./routes";

const App = () => {
  return (
   
      <AppRouter />
   
  );
};
export default App;
const root = document.getElementById('root');
ReactDOM.createRoot(root).render(<App />);
