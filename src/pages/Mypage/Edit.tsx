import { useNavigate } from 'react-router-dom';
import { TYPOGRAPHY } from '../../constants/typography';
import { COLORS } from '../../constants/colors';
import { useRef } from 'react';
import CustomSelect from '../../components/CustomSelect';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Edit = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [gender, setGender] = useState('남성'); // 기본값: 남성

  const memberId = 1; // TODO: 실제 memberId 연동 필요
  const [degree, setDegree] = useState('');

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
    !!nickname &&
    !!sleepType &&
    !!snoreType &&
    !!nightWorkType &&
    !!lifestyle &&
    !!showerTime &&
    !!itemShare &&
    !!soundTool &&
    !!callPlace &&
    !!socialType &&
    !!cleaning &&
    !!smoking &&
    !!dormEat;

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

  // 사진 변경 관련 코드
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 남성에 따른 학사 목록
  const maleDormitories = ['매지학사1', '매지학사3_남', '세연학사1', '세연학사2', '청연학사1'];
  // 여성에 따른 학사 목록
  const femaleDormitories = ['매지학사2', '매지학사3_여', '세연학사3', '청연학사2'];

  const handleSave = async () => {
    if (isDuplicated !== false) {
      alert('닉네임 중복 확인이 필요합니다.');
      return;
    }

    try {
      const payload = {
        name: '',
        introduction_comment: introduction,
        phone: '',
        email: '',
        nickname: nickname,
        sex: gender,
        dormitoryName: degree,
        livingPattern: {
          id: 0,
          member: {
            id: 0,
            joinRequests: [],
            livingPattern: '',
            username: '',
            password: '',
            name: '',
            introduction_comment: '',
            phone: '',
            email: '',
            nickname: '',
            sex: '',
            dormitoryName: '',
            memberStatus: 'NON',
          },
          sleep_pattern: sleepType,
          snoring: snoreType,
          night_work: nightWorkType,
          home_leaving: lifestyle,
          shower_pattern: showerTime,
          sharing: itemShare,
          speaker_use: soundTool,
          call_pattern: callPlace,
          introvert: socialType,
          sanitary: cleaning,
          smoke: smoking,
          available_eat: dormEat,
        },
      };

      const response = await axios.post(
        `http://localhost:8080/MyPage/Info/modify?memberId=${memberId}`,
        payload
      );
      alert('저장 성공!');
      console.log('응답:', response.data);
    } catch (error) {
      console.error('저장 실패:', error);
      alert('저장에 실패했습니다.');
    }
  };

  const [isChecking, setIsChecking] = useState(false);
  const [isDuplicated, setIsDuplicated] = useState<boolean | null>(null); // null: 초기값, true: 중복, false: 사용 가능

  const handleCheckNickname = async () => {
    if (!nickname.trim()) return alert('닉네임을 입력해주세요.');
    try {
      setIsChecking(true);
      const res = await axios.get(`http://localhost:8080/MyPage/Info/nicDup`, {
        params: { nickname },
      });

      // 예시: 백엔드에서 { duplicated: true } 또는 { duplicated: false }로 응답한다고 가정
      const duplicated = res.data?.duplicated;

      if (duplicated === true) {
        setIsDuplicated(true);
        alert('이미 사용 중인 닉네임입니다.');
      } else {
        setIsDuplicated(false);
        alert('사용 가능한 닉네임입니다!');
      }
    } catch (error) {
      console.error('중복 확인 실패:', error);
      alert('중복 확인 중 오류가 발생했습니다.');
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/MyPage/Info', {
          params: {
            memberId: memberId,
          },
        });

        const data = response.data;
        setNickname(data.nickname || '');
        setIntroduction(data.introduction_comment || '');
        setGender(data.sex || '남성');
      } catch (error) {
        console.error('사용자 정보 불러오기 실패:', error);
      }
    };

    fetchUserInfo();
  }, []);

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
          onClick={handleSave}
          style={{ color: isFormComplete ? COLORS.PRIMARY : COLORS.GRAYSCALE.G6 }}
          className={`${TYPOGRAPHY.TITLE1} px-0 py-0 bg-transparent`}
        >
          저장
        </button>
      </div>

      {/* 상단: 이미지 변경 */}
      <div className="w-full h-[145px] flex items-center justify-center">
        <div
          onClick={() => inputRef.current?.click()}
          className="relative flex items-center justify-center w-24 h-24 mb-2 overflow-hidden bg-gray-200 rounded-full cursor-pointer"
        >
          {imageSrc ? (
            <img src={imageSrc} alt="프로필" className="object-cover w-full h-full" />
          ) : (
            <img
              src="/icons/mypage_edit-contained.svg" // 연필 아이콘 경로
              alt="편집 아이콘"
            />
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) {
              setImageSrc(URL.createObjectURL(file));
            }
          }}
          ref={inputRef}
          className="hidden"
        />
      </div>

      {/* 닉네임 변경 */}
      <div className="w-full px-5 h-28">
        <div className="flex items-center justify-between mb-2">
          <p className={`${TYPOGRAPHY.TITLE1}`}>닉네임</p>
          <button
            onClick={handleCheckNickname}
            className="px-2 py-1 text-xs text-gray-400 bg-transparent border border-gray-300 rounded"
            disabled={isChecking}
          >
            {isChecking ? '확인 중...' : '중복 확인'}
          </button>
        </div>
        <input
          type="text"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          placeholder="닉네임을 입력해주세요"
          className="w-full h-12 px-4 text-sm border border-gray-300 rounded-lg"
        />
        {isDuplicated === true && (
          <p className="mt-1 text-xs text-red-500">이미 사용 중인 닉네임입니다.</p>
        )}
        {isDuplicated === false && (
          <p className="mt-1 text-xs text-green-500">사용 가능한 닉네임입니다.</p>
        )}
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

      {/* 학사 선택 */}
      <div className="flex flex-row items-start justify-center w-full h-16 gap-3 px-5">
        <p className={`${TYPOGRAPHY.TITLE2} w-[79px] h-12 px-4 py-[13px]`}>학사</p>

        {gender ? (
          <CustomSelect
            options={gender === '남성' ? maleDormitories : femaleDormitories}
            selected={degree}
            setSelected={setDegree}
          />
        ) : (
          <div
            style={{ color: COLORS.GRAYSCALE.G6, borderColor: COLORS.GRAYSCALE.G6 }}
            className="w-[250px] h-12 rounded-md border px-4 flex items-center"
          >
            성별을 먼저 선택해주세요
          </div>
        )}
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

      {/* 오픈 채팅 링크 */}
      <div className="w-full h-[112px] mt-4">
        <p className={`${TYPOGRAPHY.TITLE2} px-5 py-[13px]`}>오픈 채팅</p>
        <div className="flex justify-center w-full h-16 px-5">
          <input
            type="text"
            placeholder="오픈 채팅 링크를 입력해주세요"
            className="w-full h-12 px-4 text-sm placeholder-gray-400 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Edit;
