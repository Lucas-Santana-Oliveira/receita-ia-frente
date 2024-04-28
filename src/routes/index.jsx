import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../pages/Home/index.jsx';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};
