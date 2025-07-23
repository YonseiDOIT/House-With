import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface BottomNavigationProps {
  className?: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로 확인 함수
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
  <div className="fixed bottom-0 left-0 w-[375px] h-[56px] border-t border-gray-200 flex justify-around items-center bg-white z-50">
        {/* 홈 */}
        <button
          onClick={() => navigate('/home')}
          className={`flex flex-col items-center bg-transparent ${isActive('/home') ? 'text-[#FF7A00]' : 'text-gray-400'}`}
        >
          <img
            src={isActive('/home') ? '/icons/home_house_orange.svg' : '/icons/home_house_gray.svg'}
            className="w-5 h-5"
          />
          <span className={`mt-1 text-xs ${isActive('/home') ? 'font-semibold' : ''}`}>홈</span>
        </button>

        {/* 관리 */}
        <button
          onClick={() => navigate('/manage')}
          className={`flex flex-col items-center bg-transparent ${isActive('/manage') ? 'text-[#FF7A00]' : 'text-gray-400'}`}
        >
          <img
            src={
              isActive('/manage')
                ? '/icons/home_message_orange.svg'
                : '/icons/home_message_gray.svg'
            }
            className="w-6 h-6"
          />
          <span className={`mt-1 text-xs ${isActive('/manage') ? 'font-semibold' : ''}`}>관리</span>
        </button>

        {/* 마이페이지 */}
        <button
          onClick={() => navigate('/mypage-main')}
          className={`flex flex-col items-center bg-transparent ${isActive('/mypage-main') ? 'text-[#FF7A00]' : 'text-gray-400'}`}
        >
          <img
            src={isActive('/mypage-main') ? '/icons/mypage_Person.svg' : '/icons/admin_people.svg'}
            className="w-5 h-5"
          />
          <span className={`mt-1 text-xs ${isActive('/mypage-main') ? 'font-semibold' : ''}`}>
            마이페이지
          </span>
        </button>
      </div>
  );
};

export default BottomNavigation;