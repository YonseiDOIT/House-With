import { Route } from 'react-router-dom';
import MypageMain from '../pages/Mypage/main';
import Edit from '../pages/Mypage/Edit';
import Feedback from '../pages/Mypage/Feedback';

export const Mypage = (
  <>
    <Route path="/mypage-main" element={<MypageMain />} />
    <Route path="/mypage-edit" element={<Edit />} />
    <Route path="/mypage-feedback" element={<Feedback />} />
  </>
);
