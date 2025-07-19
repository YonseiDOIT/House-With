// 생략된 import는 기존 유지
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { TYPOGRAPHY } from '../../constants/typography';
import { COLORS } from '../../constants/colors';
import Button from '../../components/Button/Button';

const Lifestylepattern = () => {
  const navigate = useNavigate();

  // 선택 항목들 상태
  const [sleepType, setSleepType] = useState('');
  const [snoreType, setSnoreType] = useState('');
  const [nightWorkType, setNightWorkType] = useState('');
  const [lifestyle, setLifestyle] = useState('');
  const [showerTime, setShowerTime] = useState('');
  const [itemShare, setItemShare] = useState('');
  const [soundTool, setSoundTool] = useState('');
  const [callPlace, setCallPlace] = useState('');
  const [socialType, setSocialType] = useState('');
  const [cleaning, setCleaning] = useState('');
  const [smoking, setSmoking] = useState('');
  const [dormEat, setDormEat] = useState('');

  // 팝업 및 하이라이트 상태
  const [showModal, setShowModal] = useState(false);
  const [highlightEmpty, setHighlightEmpty] = useState(false);

  const isFormValid =
    sleepType &&
    snoreType &&
    nightWorkType &&
    lifestyle &&
    showerTime &&
    itemShare &&
    soundTool &&
    callPlace &&
    socialType &&
    cleaning &&
    smoking &&
    dormEat;

  // 공통 버튼 스타일 (선택 여부 + 하이라이트 여부)
  const getButtonStyle = (isSelected: boolean, isHighlighted: boolean): React.CSSProperties => {
    if (isSelected) return { backgroundColor: '#000000', color: '#FFFFFF' };
    if (isHighlighted) return { backgroundColor: '#FFE5E5', color: '#000000' };
    return { backgroundColor: COLORS.GRAYSCALE.G1, color: '#000000' };
  };

  const renderButtons = (
    options: string[],
    selected: string,
    setSelected: (value: string) => void,
    isEmpty: boolean
  ) => (
    <div className="flex flex-wrap gap-2 py-2">
      {options.map(option => (
        <button
          key={option}
          onClick={() => setSelected(option)}
          style={getButtonStyle(selected === option, highlightEmpty && isEmpty)}
          className="px-4 py-2 text-sm rounded-full"
        >
          {option}
        </button>
      ))}
    </div>
  );

  const handleSubmit = () => {
    if (!isFormValid) {
      setShowModal(true);
      setHighlightEmpty(true);
    } else {
      navigate('/Welcome');
    }
  };

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

      {/* 제목 */}
      <div className="w-[375px] h-[48px] flex items-start justify-start px-5 py-[6px]">
        <h2 className={`${TYPOGRAPHY.HEADING2} leading-snug`}>생활 패턴을 알려주세요.</h2>
      </div>

      {/* 설명 */}
      <div className="w-[375px] px-5 py-4">
        <p className={`${TYPOGRAPHY.BODY3} leading-snug whitespace-pre-line`}>
          각각에 카테고리의 모든 생활 패턴을 알려주세요.{'\n'}
          다른 사용자들이 확인할 수 있으며,{'\n'}
          추후 마이페이지에서 수정 가능합니다.
        </p>
      </div>

      {/* 설명2 */}
      <div className="w-[375px] px-5 py-4 flex flex-row gap-3">
        <p className={`${TYPOGRAPHY.TITLE1} leading-snug whitespace-pre-line`}>생활 패턴</p>
        <p
          style={{ color: highlightEmpty ? COLORS.SECONDARY.HW_Re2 : COLORS.GRAYSCALE.G8 }}
          className={`${TYPOGRAPHY.BODY3} leading-snug whitespace-pre-line`}
        >
          *모든 생활 패턴을 선택해주세요!
        </p>
      </div>

      {/* 항목들 */}
      <div className="flex flex-col w-[375px] gap-6 px-5">
        {/* 취침 */}
        <div>
          <div className="flex flex-row items-center gap-2">
            <img src="/icons/mypage_moon.svg" className="w-4 h-4" />
            <p className={`${TYPOGRAPHY.TITLE1}`}>취침 시간</p>
          </div>
          {renderButtons(['규칙적인 수면', '불규칙적인 수면'], sleepType, setSleepType, !sleepType)}
          {renderButtons(
            ['코골이 · 이갈이 있음', '코골이 · 이갈이 없음'],
            snoreType,
            setSnoreType,
            !snoreType
          )}
          {renderButtons(
            ['야간 작업 많음', '야간 작업 적음'],
            nightWorkType,
            setNightWorkType,
            !nightWorkType
          )}
        </div>

        {/* 생활 */}
        <div>
          <div className="flex flex-row items-center gap-2">
            <img src="/icons/mypage_home.svg" className="w-4 h-4" />
            <p className={`${TYPOGRAPHY.TITLE1}`}>생활</p>
          </div>
          {renderButtons(['집콕', '밖콕'], lifestyle, setLifestyle, !lifestyle)}
          {renderButtons(['아침 샤워', '저녁 샤워'], showerTime, setShowerTime, !showerTime)}
          {renderButtons(
            ['개인용품 공유 가능', '개인용품 공유 불가능'],
            itemShare,
            setItemShare,
            !itemShare
          )}
        </div>

        {/* 소리 */}
        <div>
          <div className="flex flex-row items-center gap-2">
            <img src="/icons/mypage_sound.svg" className="w-4 h-4" />
            <p className={`${TYPOGRAPHY.TITLE1}`}>소리</p>
          </div>
          {renderButtons(['이어폰 사용', '스피커 사용'], soundTool, setSoundTool, !soundTool)}
          {renderButtons(['기숙사 내 통화', '기숙사 밖 통화'], callPlace, setCallPlace, !callPlace)}
        </div>

        {/* 소통 */}
        <div>
          <div className="flex flex-row items-center gap-2">
            <img src="/icons/mypage_chat.svg" className="w-4 h-4" />
            <p className={`${TYPOGRAPHY.TITLE1}`}>소통</p>
          </div>
          {renderButtons(['내향적', '외향적'], socialType, setSocialType, !socialType)}
        </div>

        {/* 정리 */}
        <div>
          <div className="flex flex-row items-center gap-2">
            <img src="/icons/mypage_clean.svg" className="w-4 h-4" />
            <p className={`${TYPOGRAPHY.TITLE1}`}>정리</p>
          </div>
          {renderButtons(['위생에 민감해요', '위생에 둔해요'], cleaning, setCleaning, !cleaning)}
        </div>

        {/* 습관 */}
        <div>
          <div className="flex flex-row items-center gap-2">
            <img src="/icons/mypage_Person.svg" className="w-4 h-4" />
            <p className={`${TYPOGRAPHY.TITLE1}`}>습관</p>
          </div>
          {renderButtons(['흡연자', '비흡연자'], smoking, setSmoking, !smoking)}
          {renderButtons(
            ['기숙사 내 취식 가능', '기숙사 내 취식 불가'],
            dormEat,
            setDormEat,
            !dormEat
          )}
        </div>
      </div>

      {/* 완료 버튼 */}
      <div className="w-[375px] px-5 py-6">
        <button
          onClick={handleSubmit}
          className={`w-full h-[48px] rounded-md mt-4 ${
            isFormValid ? 'bg-black text-white' : 'bg-gray-300 text-white'
          }`}
        >
          작성 완료
        </button>
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl w-[336px] h-[184px] text-center">
            <div className="py-[35px] mb-[2px]">
              <p className={`${TYPOGRAPHY.BODY3} items-center justify-center py-4`}>
                모든 생활 패턴을 선택해주세요.
              </p>
            </div>
            <Button
              size="lg"
              onClick={() => setShowModal(false)}
              className="w-full h-[56px] bg-black text-white rounded-b-lg"
            >
              확인
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lifestylepattern;
