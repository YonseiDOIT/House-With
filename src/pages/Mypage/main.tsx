import { TYPOGRAPHY } from '../../constants/typography';
import { COLORS } from '../../constants/colors';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import BottomNavigation from '../../components/BottomNavigation';

const MyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // API로 불러온 데이터 상태
  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState('');
  const memberId = 1; // TODO: 실제 로그인 정보로 대체

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://ec2-52-78-243-69.ap-northeast-2.compute.amazonaws.com:8080/MyPage',
          {
            params: { memberId },
          }
        );
        setNickname(response.data.nickname || '');
        setIntroduction(response.data.introduction_comment || '');
      } catch (error) {
        console.error('마이페이지 데이터 로드 실패:', error);
        setNickname('');
        setIntroduction('');
      }
    };
    fetchData();
  }, []);

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
            <p className={`${TYPOGRAPHY.TITLE1}`}>{nickname || '닉네임 없음'}</p>
          </div>

          {/* 소개글 */}
          {introduction && (
            <p className={`${TYPOGRAPHY.BODY3} h-11 text-center mt-1 text-gray-500 leading-snug`}>
              {introduction}
            </p>
          )}

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
                  onClick={() => navigate('/homefilter')}
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
      <BottomNavigation />
    </div>
  );
};

export default MyPage;
