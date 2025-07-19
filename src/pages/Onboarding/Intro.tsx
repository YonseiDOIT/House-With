import Button from '../../components/Button/Button';
import { TYPOGRAPHY } from '../../constants/typography';
import { useNavigate } from 'react-router-dom';

const Intro = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-start justify-start w-full max-w-[375px] mx-auto min-h-screen py-6">
      {/* 내비게이션 바*/}
      <div className="w-screen h-[48px] flex items-center justify-start px-4 py-1 mb-4">
        <img
          src="../public/logo/home_logo.svg"
          alt="house with 로고"
          className="w-[105px] h-[37px]"
        />
      </div>

      {/* 상단: 제목 */}
      <div className="w-full h-[88px] flex items-start justify-start px-6 mb-4">
        <h2 className={`${TYPOGRAPHY.HEADING2}`}>
          성향 맞는 룸메이트,
          <br />
          찾기 힘드셨죠?
        </h2>
      </div>

      {/* 중간: 이모지 */}
      <div className="mb-6">
        <img src="../public/image/intro.svg" alt="집 이모지" className="w-full h-[288px] mx-auto" />
      </div>

      {/* 하단: 설명 */}
      <div className="w-full h-[70px] px-6 mb-5 text-center">
        <p className={`${TYPOGRAPHY.BODY3} text-center`}>
          하우스윗은 성향을 기반으로 룸메이트를 매칭해,
          <br />
          함께 살아도 편한 룸메이트를 찾아드려요.
        </p>
      </div>

      {/* 하단: 버튼 */}
      <div className="flex items-center justify-center w-full h-[64px] px-6">
        <Button size="xl" onClick={handleStart}>
          지금 룸메이트 찾기
        </Button>
      </div>
    </div>
  );
};

export default Intro;
