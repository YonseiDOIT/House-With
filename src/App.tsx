import { BrowserRouter, Routes } from 'react-router-dom';
import { OnboardingRoutes } from './routes/OnboardingRoutes';
import { Mypage } from './routes/Mypage';
import { HomeRoutes } from './routes/HomeRoutes';
import { ManageRoutes } from './routes/ManageRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      
        {HomeRoutes}
        {ManageRoutes}
        {OnboardingRoutes}
        {Mypage}


      </Routes>
    </BrowserRouter>
  );
}

export default App;