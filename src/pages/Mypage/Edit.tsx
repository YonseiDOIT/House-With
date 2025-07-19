// 생략된 import 부분은 기존 그대로 유지
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { TYPOGRAPHY } from '../../constants/typography';
import { COLORS } from '../../constants/colors';

const Edit = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState('');

  // 취침
  const [sleepType, setSleepType] = useState('');
  const [snoreType, setSnoreType] = useState('');
  const [nightWorkType, setNightWorkType] = useState('');

  // 생활
  const [lifestyle, setLifestyle] = useState('');
  const [showerTime, setShowerTime] = useState('');
  const [itemShare, setItemShare] = useState('');

  // 소리
  const [soundTool, setSoundTool] = useState('');
  const [callPlace, setCallPlace] = useState('');

  // 소통
  const [socialType, setSocialType] = useState('');

  // 정리
  const [cleaning, setCleaning] = useState('');

  // 습관
  const [smoking, setSmoking] = useState('');
  const [dormEat, setDormEat] = useState('');

  // 모든 항목이 선택되었는지 여부 확인 (소개글은 제외)
  const isFormComplete =
    nickname &&
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

  const highlightEmpty = !isFormComplete;

  const getButtonStyle = (isSelected: boolean) => `
    px-4 py-2 text-sm rounded-full border
    ${isSelected ? 'bg-black text-white' : 'bg-gray-200 text-black'}
  `;

  const renderButtons = (
    options: string[],
    selected: string,
    setSelected: (val: string) => void
  ) => (
    <div className="flex flex-wrap gap-2 py-2">
      {options.map(option => (
        <button
          key={option}
          onClick={() => setSelected(option)}
          className={getButtonStyle(selected === option)}
        >
          {option}
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-start justify-start w-full max-w-[375px] mx-auto min-h-screen py-6 pb-[72px]">
      {/* 상단 뒤로가기 버튼 */}
      <div className="w-[375px] h-[48px] flex items-center justify-between px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
          className="px-0 py-0 bg-transparent"
        >
          <img src="/icons/chevron_left.svg" alt="뒤로가기" />
        </button>
        <button
          disabled={!isFormComplete}
          onClick={() => console.log('저장')}
          style={{ color: isFormComplete ? COLORS.PRIMARY : COLORS.GRAYSCALE.G6 }}
          className={`${TYPOGRAPHY.TITLE1} px-0 py-0 bg-transparent`}
        >
          저장
        </button>
      </div>

      {/* 상단: 이미지 변경 */}
      <div className="w-full h-[145px] flex items-center justify-center">
        <div className="w-24 h-24 mb-2 bg-gray-200 rounded-full" />
      </div>

      {/* 닉네임 변경 */}
      <div className="w-full px-5 h-28">
        <div className="flex items-center justify-between mb-2">
          <p className={`${TYPOGRAPHY.TITLE1}`}>닉네임</p>
          <button className="px-2 py-1 text-xs text-gray-400 bg-transparent border border-gray-300 rounded">
            중복 확인
          </button>
        </div>
        <input
          type="text"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          placeholder="닉네임을 입력해주세요"
          className="w-full h-12 px-4 text-sm border border-gray-300 rounded-lg"
        />
      </div>

      {/* 소개글 변경 */}
      <div className="w-full px-5 h-28">
        <div className="flex items-center justify-between mb-2">
          <p className={`${TYPOGRAPHY.TITLE1}`}>소개글 (선택)</p>
          <p className="text-xs text-gray-500">{introduction.length}/50</p>
        </div>
        <input
          type="text"
          value={introduction}
          onChange={e => {
            if (e.target.value.length <= 50) {
              setIntroduction(e.target.value);
            }
          }}
          placeholder="소개글을 입력해주세요"
          className="w-full h-12 px-4 text-sm placeholder-gray-400 border border-gray-300 rounded-lg"
        />
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
          {renderButtons(['규칙적인 수면', '불규칙적인 수면'], sleepType, setSleepType)}
          {renderButtons(['코골이 · 이갈이 있음', '코골이 · 이갈이 없음'], snoreType, setSnoreType)}
          {renderButtons(['야간 작업 많음', '야간 작업 적음'], nightWorkType, setNightWorkType)}
        </div>

        {/* 생활 */}
        <div>
          <div className="flex flex-row items-center gap-2">
            <img src="/icons/mypage_home.svg" className="w-4 h-4" />
            <p className={`${TYPOGRAPHY.TITLE1}`}>생활</p>
          </div>
          {renderButtons(['집콕', '밖콕'], lifestyle, setLifestyle)}
          {renderButtons(['아침 샤워', '저녁 샤워'], showerTime, setShowerTime)}
          {renderButtons(['개인용품 공유 가능', '개인용품 공유 불가능'], itemShare, setItemShare)}
        </div>

        {/* 소리 */}
        <div>
          <div className="flex flex-row items-center gap-2">
            <img src="/icons/mypage_sound.svg" className="w-4 h-4" />
            <p className={`${TYPOGRAPHY.TITLE1}`}>소리</p>
          </div>
          {renderButtons(['이어폰 사용', '스피커 사용'], soundTool, setSoundTool)}
          {renderButtons(['기숙사 내 통화', '기숙사 밖 통화'], callPlace, setCallPlace)}
        </div>

        {/* 소통 */}
        <div>
          <div className="flex flex-row items-center gap-2">
            <img src="/icons/mypage_chat.svg" className="w-4 h-4" />
            <p className={`${TYPOGRAPHY.TITLE1}`}>소통</p>
          </div>
          {renderButtons(['내향적', '외향적'], socialType, setSocialType)}
        </div>

        {/* 정리 */}
        <div>
          <div className="flex flex-row items-center gap-2">
            <img src="/icons/mypage_clean.svg" className="w-4 h-4" />
            <p className={`${TYPOGRAPHY.TITLE1}`}>정리</p>
          </div>
          {renderButtons(['위생에 민감해요', '위생에 둔해요'], cleaning, setCleaning)}
        </div>

        {/* 습관 */}
        <div>
          <div className="flex flex-row items-center gap-2">
            <img src="/icons/mypage_Person.svg" className="w-4 h-4" />
            <p className={`${TYPOGRAPHY.TITLE1}`}>습관</p>
          </div>
          {renderButtons(['흡연자', '비흡연자'], smoking, setSmoking)}
          {renderButtons(['기숙사 내 취식 가능', '기숙사 내 취식 불가'], dormEat, setDormEat)}
        </div>
      </div>
    </div>
  );
};

export default Edit;
