import Button from '../../components/Button/Button';
import { TYPOGRAPHY } from '../../constants/typography';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start justify-start w-full max-w-[375px] mx-auto min-h-screen py-6">
      {/* 상단 뒤로가기 버튼 */}
      <div className="w-[375px] h-[48px] flex items-center justify-start px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
          className="w-8 h-8 px-0 py-0 bg-transparent"
        >
          <img src="/icons/chevron_left.svg" alt="뒤로가기" />
        </button>
      </div>

      {/* 인디케이터 */}
      <div className="w-[375px] h-[40px] flex items-center justify-start px-4 py-2">
        <img src="/icons/indicator_3.svg" alt="현재 위치" />
      </div>

      {/* 상단: 제목 */}
      <div className="flex items-start justify-start w-full h-12 px-4">
        <h2 className={`${TYPOGRAPHY.HEADING2}`}>반가워요!</h2>
      </div>

      {/* 중간: 이모지 */}
      <div className="w-[375px] mb-[92px]">
        <img
          src="../public/image/signup.svg"
          alt="집 이모지"
          className="w-[375px] h-[384px] mx-auto"
        />
      </div>

      {/* 하단: 버튼 */}
      <div className="flex items-center justify-center w-full h-[64px] px-6">
        <Button size="xl" onClick={() => navigate('/mypage-main')}>
          하웃스윗 시작하기
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
