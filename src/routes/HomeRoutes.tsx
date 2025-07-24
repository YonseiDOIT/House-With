import { Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import HomeFilter from '../pages/HomeFilter';
import HomeDetail from '../pages/Home/HomeDetail';
export const HomeRoutes = (
  <>
    
    <Route path="/homefilter" element={<HomeFilter />} />
    <Route path="/home" element={<Home />} />
    <Route path="/homedetail" element={<HomeDetail />} />


  </>
);
