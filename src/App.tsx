import { BrowserRouter, Routes } from 'react-router-dom';
import { OnboardingRoutes } from './routes/OnboardingRoutes';
import { Mypage } from './routes/Mypage';
import { HomeRoutes } from './routes/HomeRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>{HomeRoutes}</Routes>
    </BrowserRouter>
  );
}

export default App;
