import { Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import HomeFilter from '../pages/HomeFilter';
export const HomeRoutes = (
  <>
    
    <Route path="/homefilter" element={<HomeFilter />} />
    <Route path="/home" element={<Home />} />

  </>
);
