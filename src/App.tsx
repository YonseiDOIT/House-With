import { BrowserRouter, Routes } from 'react-router-dom';
import { OnboardingRoutes } from './routes/OnboardingRoutes';
import { Mypage } from './routes/Mypage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {OnboardingRoutes}
        {Mypage}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
