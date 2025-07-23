import { BrowserRouter, Routes } from 'react-router-dom';
import { OnboardingRoutes } from './routes/OnboardingRoutes';
import { Mypage } from './routes/Mypage';
import { HomeRoutes } from './routes/HomeRoutes';
import { ManageRoutes } from './routes/ManageRoutes';
import Home from './pages/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      
        {ManageRoutes}

      </Routes>
    </BrowserRouter>
  );
}

export default App;