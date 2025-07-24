import { useNavigate } from 'react-router-dom';
import { TYPOGRAPHY } from '../../constants/typography';
import { COLORS } from '../../constants/colors';
import { useRef } from 'react';
import CustomSelect from '../../components/CustomSelect';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from '../../components/Button/Button';

/* 매핑 */
const dormitoryNameMap: Record<string, string> = {
  MAEJI_1: '매지학사1',
  MAEJI_2: '매지학사2',
  MAEJI_3_MALE: '매지학사3_남',
  MAEJI_3_FEMALE: '매지학사3_여',
  SEYEON_1: '세연학사1',
  SEYEON_2: '세연학사2',
  SEYEON_3: '세연학사3',
  CHEONGYEON_1: '청연학사1',
  CHEONGYEON_2: '청연학사2',
};

const koreanToEnumMap = Object.entries(dormitoryNameMap).reduce(
  (acc, [key, value]) => {
    acc[value] = key;
    return acc;
  },
  {} as Record<string, string>
);

const Edit = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [gender, setGender] = useState('남성'); // 기본값: 남성

  const memberIdList = [202, 155, 154, 253, 352];
  const memberId = memberIdList[Math.floor(Math.random() * memberIdList.length)];
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

  // 닉네임 중복 확인 모달 상태
  const [showNicknameAvailableModal, setShowNicknameAvailableModal] = useState(false);
  const [showNicknameUnavailableModal, setShowNicknameUnavailableModal] = useState(false);

  // 저장 성공 모달 상태
  const [showSaveSuccessModal, setShowSaveSuccessModal] = useState(false);

  // 저장 실패 모달 상태
  const [showSaveFailModal, setShowSaveFailModal] = useState(false);

  // 저장(수정) 버튼 클릭 시 실행되는 함수
  // - 프로필 정보와 생활패턴을 서버에 저장(POST)
  // - 저장 성공/실패/성공 안내를 팝업으로 표시
  const handleSave = async () => {
    if (
      isDuplicated !== false &&
      nickname !== originalData?.nickname // ✅ 닉네임이 변경된 경우에만 중복 확인 필요
    ) {
      alert('닉네임 중복 확인 후 사용 가능한 경우에만 저장할 수 있습니다.');
      return;
    }

    try {
      const payload = {
        name: name,
        introduction_comment: introduction,
        nickname: nickname,
        sex: gender === '남성' ? 'male' : 'female',
        dormitoryName: koreanToEnumMap[degree],
        livingPattern: {
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
      console.log('POST payload:', payload);
      await axios.post(
        `http://ec2-52-78-243-69.ap-northeast-2.compute.amazonaws.com:8080/MyPage/Info/modify?memberId=${memberId}`,
        payload
      );
      // 저장 후 GET으로 최신 정보 다시 불러오기
      const response = await axios.get(
        'http://ec2-52-78-243-69.ap-northeast-2.compute.amazonaws.com:8080/MyPage/Info',
        {
          params: { memberId },
        }
      );
      const data = response.data;
      setNickname(data.nickname || '');
      setIntroduction(data.introduction_comment || '');
      setGender(data.sex === 'male' ? '남성' : '여성');
      setDegree(dormitoryNameMap[data.dormitoryName] || '');
      if (data.livingPattern) {
        setSleepType(data.livingPattern.sleep_pattern || '');
        setSnoreType(data.livingPattern.snoring || '');
        setNightWorkType(data.livingPattern.night_work || '');
        setLifestyle(data.livingPattern.home_leaving || '');
        setShowerTime(data.livingPattern.shower_pattern || '');
        setItemShare(data.livingPattern.sharing || '');
        setSoundTool(data.livingPattern.speaker_use || '');
        setCallPlace(data.livingPattern.call_pattern || '');
        setSocialType(data.livingPattern.introvert || '');
        setCleaning(data.livingPattern.sanitary || '');
        setSmoking(data.livingPattern.smoke || '');
        setDormEat(data.livingPattern.available_eat || '');
      }
      setOriginalData({
        nickname: data.nickname || '',
        introduction: data.introduction_comment || '',
        gender: data.sex === 'male' ? '남성' : '여성',
        degree: dormitoryNameMap[data.dormitoryName] || '',
        sleepType: data.livingPattern?.sleep_pattern || '',
        snoreType: data.livingPattern?.snoring || '',
        nightWorkType: data.livingPattern?.night_work || '',
        lifestyle: data.livingPattern?.home_leaving || '',
        showerTime: data.livingPattern?.shower_pattern || '',
        itemShare: data.livingPattern?.sharing || '',
        soundTool: data.livingPattern?.speaker_use || '',
        callPlace: data.livingPattern?.call_pattern || '',
        socialType: data.livingPattern?.introvert || '',
        cleaning: data.livingPattern?.sanitary || '',
        smoking: data.livingPattern?.smoke || '',
        dormEat: data.livingPattern?.available_eat || '',
      });
      setShowSaveSuccessModal(true);
    } catch (error) {
      console.error('저장 또는 정보 갱신 실패:', error);
      setShowSaveFailModal(true);
    }
  };

  const [isChecking] = useState(false);
  const [isDuplicated, setIsDuplicated] = useState<boolean | null>(null); // null: 초기값, true: 중복, false: 사용 가능

  const handleCheckNickname = async () => {
    if (!nickname.trim()) {
      setShowNicknameUnavailableModal(true);
      return;
    }

    try {
      const response = await axios.get(
        'http://ec2-52-78-243-69.ap-northeast-2.compute.amazonaws.com:8080/MyPage/Info/nicDup',
        {
          params: { nickname },
        }
      );
      console.log('닉네임 중복 확인 응답:', response.data);

      if (response.data === 'DUPLICATED') {
        setIsDuplicated(true);
        setShowNicknameUnavailableModal(true);
      } else {
        setIsDuplicated(false);
        setShowNicknameAvailableModal(true);
      }
    } catch (error) {
      // 닉네임이 중복이거나 오류가 발생한 경우
      console.error('닉네임 중복 확인 실패:', error);
      setIsDuplicated(true);
      setShowNicknameUnavailableModal(true);
    }
  };

  // 원본 데이터 상태 추가
  const [originalData, setOriginalData] = useState<{
    nickname: string;
    introduction: string;
    gender: string;
    degree: string;
    sleepType: string;
    snoreType: string;
    nightWorkType: string;
    lifestyle: string;
    showerTime: string;
    itemShare: string;
    soundTool: string;
    callPlace: string;
    socialType: string;
    cleaning: string;
    smoking: string;
    dormEat: string;
  } | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          'http://ec2-52-78-243-69.ap-northeast-2.compute.amazonaws.com:8080/MyPage/Info',
          {
            params: { memberId },
          }
        );
        const data = response.data;

        setNickname(data.nickname || '');
        setIntroduction(data.introduction_comment || '');
        setGender(data.sex === 'male' ? '남성' : '여성');
        setDegree(dormitoryNameMap[data.dormitoryName] || '');

        if (data.livingPattern) {
          setSleepType(data.livingPattern.sleep_pattern || '');
          setSnoreType(data.livingPattern.snoring || '');
          setNightWorkType(data.livingPattern.night_work || '');
          setLifestyle(data.livingPattern.home_leaving || '');
          setShowerTime(data.livingPattern.shower_pattern || '');
          setItemShare(data.livingPattern.sharing || '');
          setSoundTool(data.livingPattern.speaker_use || '');
          setCallPlace(data.livingPattern.call_pattern || '');
          setSocialType(data.livingPattern.introvert || '');
          setCleaning(data.livingPattern.sanitary || '');
          setSmoking(data.livingPattern.smoke || '');
          setDormEat(data.livingPattern.available_eat || '');
        }
        // 원본 데이터 저장
        setOriginalData({
          nickname: data.nickname || '',
          introduction: data.introduction_comment || '',
          gender: data.sex === 'male' ? '남성' : '여성',
          degree: data.dormitoryName || '',
          sleepType: data.livingPattern?.sleep_pattern || '',
          snoreType: data.livingPattern?.snoring || '',
          nightWorkType: data.livingPattern?.night_work || '',
          lifestyle: data.livingPattern?.home_leaving || '',
          showerTime: data.livingPattern?.shower_pattern || '',
          itemShare: data.livingPattern?.sharing || '',
          soundTool: data.livingPattern?.speaker_use || '',
          callPlace: data.livingPattern?.call_pattern || '',
          socialType: data.livingPattern?.introvert || '',
          cleaning: data.livingPattern?.sanitary || '',
          smoking: data.livingPattern?.smoke || '',
          dormEat: data.livingPattern?.available_eat || '',
        });
      } catch (error) {
        console.error('사용자 정보 불러오기 실패:', error);
        alert('사용자 정보를 불러오지 못했습니다.');
      }
    };

    fetchUserInfo();
  }, []);

  // 변경사항 비교 함수 (수정 여부 확인)
  const isDataChanged = () => {
    if (!originalData) return false;
    return (
      nickname !== originalData.nickname ||
      introduction !== originalData.introduction ||
      gender !== originalData.gender ||
      degree !== originalData.degree ||
      sleepType !== originalData.sleepType ||
      snoreType !== originalData.snoreType ||
      nightWorkType !== originalData.nightWorkType ||
      lifestyle !== originalData.lifestyle ||
      showerTime !== originalData.showerTime ||
      itemShare !== originalData.itemShare ||
      soundTool !== originalData.soundTool ||
      callPlace !== originalData.callPlace ||
      socialType !== originalData.socialType ||
      cleaning !== originalData.cleaning ||
      smoking !== originalData.smoking ||
      dormEat !== originalData.dormEat
    );
  };

  // 변경사항 저장 여부 모달 상태
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  // 뒤로가기 버튼 클릭 시 실행되는 함수 (변경사항 있을 때 팝업)
  const handleBack = () => {
    if (isDataChanged()) {
      setShowLeaveModal(true);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start w-full max-w-[375px] mx-auto min-h-screen py-6 pb-[72px]">
      {/* 상단 뒤로가기 버튼 */}
      <div className="w-[375px] h-[48px] flex items-center justify-between px-4 py-3">
        <button onClick={handleBack} aria-label="뒤로가기" className="px-0 py-0 bg-transparent">
          <img src="/icons/chevron_left.svg" alt="뒤로가기" />
        </button>
        <button
          onClick={() => {
            console.log('handleSave 실행');
            handleSave();
          }}
          style={{ color: COLORS.PRIMARY }}
          className={`${TYPOGRAPHY.TITLE2} px-0 py-0 bg-transparent`}
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
            <img src="/icons/mypage_edit-contained.svg" alt="편집 아이콘" />
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
          onChange={e => {
            setNickname(e.target.value);
            setIsDuplicated(null);
          }}
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

      {/* 닉네임 사용 가능 모달 */}
      {showNicknameAvailableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl w-[336px] h-[184px] text-center">
            <div className="py-10">
              <p className={`${TYPOGRAPHY.BODY3} px-[86.5px] py-[12.5px] text-black`}>
                사용 가능한 닉네임입니다!
              </p>
            </div>
            <Button
              className="w-full h-[56px] bg-black text-white border-none rounded-b-lg rounded-t-none"
              onClick={() => setShowNicknameAvailableModal(false)}
            >
              확인
            </Button>
          </div>
        </div>
      )}
      {/* 닉네임 사용 불가 모달 */}
      {showNicknameUnavailableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl w-[336px] h-[184px] text-center">
            <div className="py-10">
              <p className={`${TYPOGRAPHY.BODY3} px-[86.5px] py-[12.5px] text-black`}>
                다른 닉네임을 다시 입력해주세요.
              </p>
            </div>
            <Button
              className="w-full h-[56px] bg-black text-white border-none rounded-b-lg rounded-t-none"
              onClick={() => setShowNicknameUnavailableModal(false)}
            >
              확인
            </Button>
          </div>
        </div>
      )}
      {/* 변경사항 저장 여부 모달 */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl w-[336px] h-[184px] text-center">
            <div className="pt-10 pb-[32px]">
              <p className={`${TYPOGRAPHY.BODY3} px-[40px] pt-2 text-black`}>
                변경사항이 저장되지 않았습니다. 그래도 나가시겠습니까?
              </p>
            </div>
            <div className="flex w-full bg-black rounded-b-md">
              <Button
                className="w-1/2 h-[56px] bg-black text-white border-none rounded-bl-lg"
                onClick={() => {
                  setShowLeaveModal(false);
                }}
              >
                취소
              </Button>
              <div className="w-px h-[56px] bg-gray-200" />
              <Button
                className="w-1/2 h-[56px] bg-black text-white border-none rounded-br-lg"
                onClick={() => {
                  setShowLeaveModal(false);
                  navigate(-1);
                }}
              >
                확인
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* 저장 성공 모달 */}
      {showSaveSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl w-[336px] h-[184px] text-center">
            <div className="py-10">
              <p className={`${TYPOGRAPHY.BODY3} px-[40px] py-[12.5px] text-black`}>
                저장 및 최신 정보 반영 완료!
              </p>
            </div>
            <Button
              className="w-full h-[56px] bg-black text-white border-none rounded-b-lg rounded-t-none"
              onClick={() => setShowSaveSuccessModal(false)}
            >
              확인
            </Button>
          </div>
        </div>
      )}
      {/* 저장 실패 모달 */}
      {showSaveFailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl w-[336px] h-[184px] text-center">
            <div className="py-10">
              <p className={`${TYPOGRAPHY.BODY3} px-[40px] py-[12.5px] text-black`}>
                저장 또는 정보 갱신에 실패했습니다.
              </p>
            </div>
            <Button
              className="w-full h-[56px] bg-black text-white border-none rounded-b-lg rounded-t-none"
              onClick={() => setShowSaveFailModal(false)}
            >
              확인
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
