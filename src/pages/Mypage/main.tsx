import { TYPOGRAPHY } from '../../constants/typography';
import { COLORS } from '../../constants/colors';
import { useNavigate, useLocation } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <div className="flex flex-col items-center justify-between w-full max-w-[375px] mx-auto min-h-screen pb-[72px]">
      {/* 상단 내용 */}
      <div className="flex flex-col items-center w-[375px] mt-6">
        {/* 마이페이지 제목 */}
        <div className="w-full h-12 px-4 py-[7px] text-left">
          <h1 className={`${TYPOGRAPHY.HEADING2}`}>마이페이지</h1>
        </div>

        {/* 프로필 섹션 */}
        <div className="w-full h-[229px] flex flex-col items-center">
          {/* 프로필 이미지 */}
          <div className="w-24 h-24 mb-2 bg-gray-200 rounded-full" />

          {/* 닉네임 + 이모지 */}
          <div className="flex items-center gap-1">
            <p className={`${TYPOGRAPHY.TITLE1}`}>두잇 5팀 가족</p>
          </div>

          {/* 소개글 */}
          <p className={`${TYPOGRAPHY.BODY3} h-11 text-center mt-1 text-gray-500 leading-snug`}>
            [소개글] 20학번이고 늦게자요
            <br />
            잠만 잘자면돼요 편하게 연락주세요
          </p>

          {/* 프로필 수정 버튼 */}
          <button
            onClick={() => navigate('/mypage-edit')}
            style={{ backgroundColor: COLORS.GRAYSCALE.G2 }}
            className={`${TYPOGRAPHY.TITLE1} px-4 py-2 mt-4 bg-white border border-gray-300 rounded-full`}
          >
            프로필 수정
          </button>
        </div>

        {/* 목록 섹션 */}
        <div className="flex flex-col w-full gap-4 mt-[52px]">
          {/* 나의 하우스 */}
          <div>
            <p className={`${TYPOGRAPHY.TITLE2} px-6 py-[13px]`}>나의 하우스</p>
            <div className="flex flex-col gap-2">
              <div className="px-6 py-[14.5px] flex items-center justify-between">
                <p className={`${TYPOGRAPHY.BODY3}`}>내가 저장한 목록</p>
                <button
                  onClick={() => navigate('/mypage-edit')}
                  className="px-0 py-0 bg-transparent"
                >
                  <img src="../public/icons/chevron_right.svg" className="w-6 h-6" />
                </button>
              </div>
              <div className="px-6 py-[14.5px] flex items-center justify-between">
                <p className={`${TYPOGRAPHY.BODY3}`}>내가 받은 피드백</p>
                <button
                  onClick={() => navigate('/mypage-feedback')}
                  className="px-0 py-0 bg-transparent"
                >
                  <img src="../public/icons/chevron_right.svg" className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* 기타 메뉴 */}
          <div className=" w-[327px] pt-4 mt-2 ml-6 border-t border-gray-200">
            <div className="py-[13px]">
              <p className={`${TYPOGRAPHY.TITLE2}`}>앱 정보</p>
            </div>
            <div className="py-[13px]">
              <p className={`${TYPOGRAPHY.TITLE2}`}>계정관리</p>
            </div>
            <div className="py-[13px]">
              <p className={`${TYPOGRAPHY.TITLE2}`}>신고 및 피드백</p>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <div className="fixed bottom-0 left-0 w-full h-[56px] border-t border-gray-200 flex justify-around items-center bg-white z-50">
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
          onClick={() => navigate('/letter')}
          className={`flex flex-col items-center bg-transparent ${isActive('/letter') ? 'text-[#FF7A00]' : 'text-gray-400'}`}
        >
          <img
            src={
              isActive('/letter')
                ? '/icons/home_message_orange.svg'
                : '/icons/home_message_gray.svg'
            }
            className="w-6 h-6"
          />
          <span className={`mt-1 text-xs ${isActive('/letter') ? 'font-semibold' : ''}`}>관리</span>
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
    </div>
  );
};

export default MyPage;
