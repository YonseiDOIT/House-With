import { useNavigate } from 'react-router-dom';
import { TYPOGRAPHY } from '../../constants/typography';
import { COLORS } from '../../constants/colors';

const Feedback = () => {
  const navigate = useNavigate();

  // 매너 피드백 텍스트
  const positiveFeedbacks = [
    '친절하고 매너가 좋아요',
    '정리정돈을 잘해요',
    '조용하고 배려심 있어요',
    '규칙을 잘 지켜요',
    '다시 함께 하고 싶어요',
  ];

  // 비매너 피드백 텍스트
  const negativeFeedbacks = [
    '예의가 부족했어요',
    '청소에 소홀했어요',
    '생활 소음이 있었어요',
    '규칙을 잘 지키지 않았어요',
    '다시 함께 지내기 어려울 것 같아요',
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-[375px] mx-auto min-h-screen bg-white">
      {/* 상단 헤더 */}
      <div className="w-[375px] h-[48px] flex items-center justify-start px-4 py-3 mt-6 gap-[90px]">
        <button
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
          className="px-0 py-0 bg-transparent"
        >
          <img src="/icons/chevron_left.svg" alt="뒤로가기" />
        </button>
        <p style={{ color: COLORS.GRAYSCALE.B }} className={`${TYPOGRAPHY.TITLE1}`}>
          내가 받은 피드백
        </p>
      </div>

      {/* 피드백 내용 */}
      <div className="flex flex-col w-full gap-6 px-5 mt-4">
        {/* 받은 매너 칭찬 */}
        <div className="mb-[8px]">
          <div className="flex items-center gap-2 mb-[23px]">
            <img src="/icons/mypage_smile.svg" alt="매너 아이콘" className="w-4 h-4" />
            <p className={`${TYPOGRAPHY.TITLE2}`}>받은 매너 칭찬</p>
          </div>
          <div className="flex flex-col gap-[30px]">
            {positiveFeedbacks.map((text, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <p className={`${TYPOGRAPHY.BODY3} h-[15px]`}>{text}</p>
                <div className="flex items-center gap-1">
                  <img src="/icons/admin_people.svg" className="w-4 h-4" />
                  <span className="text-sm text-gray-500">00</span> {/* ← 향후 API 데이터로 대체 */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 구분선 */}
        <div className="w-full h-px bg-gray-200" />

        {/* 받은 비매너 칭찬 */}
        <div>
          <div className="flex items-center gap-2 mb-[23px]">
            <img src="/icons/mypage_cry.svg" alt="비매너 아이콘" className="w-4 h-4" />
            <p className={`${TYPOGRAPHY.TITLE2}`}>받은 비매너 칭찬</p>
          </div>
          <div className="flex flex-col gap-[30px]">
            {negativeFeedbacks.map((text, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <p className={`${TYPOGRAPHY.BODY3}`}>{text}</p>
                <div className="flex items-center gap-1">
                  <img src="/icons/admin_people.svg" className="w-4 h-4" />
                  <span className="text-sm text-gray-500">00</span> {/* ← 향후 API 데이터로 대체 */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
