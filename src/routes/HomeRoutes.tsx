import { Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import HomeFilter from '../pages/Home/HomeFilter';
export const HomeRoutes = (
  <>
    <Route path="/home" element={<Home />} />
    <Route path="/homefilter" element={<HomeFilter />} />
  </>
);
