import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TYPOGRAPHY } from '../../constants/typography';
import { COLORS } from '../../constants/colors';
import Button from '../../components/Button/Button';

const Setup = () => {
  const navigate = useNavigate(); // 뒤로가기 등 페이지 이동에 사용

  // ==============================
  // 입력 값 상태 관리
  // ==============================
  const [nickname, setNickname] = useState(''); // 닉네임 입력값
  const [gender, setGender] = useState(''); // 성별 선택값
  const [degree, setDegree] = useState(''); // 학사 선택값

  // ==============================
  // 닉네임 중복 확인 및 모달 상태
  // ==============================
  const [isNicknameChecked, setIsNicknameChecked] = useState(false); // 닉네임 중복확인 완료 여부
  const [showAvailableModal, setShowAvailableModal] = useState(false); // 사용 가능한 닉네임 모달 표시 여부
  const [showUnavailableModal, setShowUnavailableModal] = useState(false); // 사용할 수 없는 닉네임 모달 (추후 API 연동용)

  // 닉네임 유효성 조건 (2~8자)
  const isNicknameValid = nickname.length >= 2 && nickname.length <= 8;

  // 작성 완료 버튼 활성화 조건
  const isFormValid = isNicknameChecked && gender && degree;

  // ==============================
  // 닉네임 중복확인 버튼 클릭 핸들러
  // ==============================
  const handleCheckNickname = () => {
    if (isNicknameValid) {
      // 현재는 조건 만족 시 사용 가능 모달만 띄움 (API 연동 시 분기 가능)
      setShowAvailableModal(true);
    } else {
      alert('닉네임은 2~8자 사이로 입력해주세요.');
    }
  };

  // 모달 '확인' 클릭 시 → 모달 닫고, 중복확인 완료 상태로 설정
  const handleConfirmAvailableModal = () => {
    setShowAvailableModal(false);
    setIsNicknameChecked(true);
  };

  return (
    <div className="flex flex-col items-start justify-start w-full max-w-[375px] mx-auto min-h-screen py-6">
      {/* 상단 뒤로가기 버튼 */}
      <div className="w-full h-[48px] flex items-center justify-start px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
          className="w-8 h-8 px-0 py-0 bg-transparent"
        >
          <img src="/icons/chevron_left.svg" alt="뒤로가기" />
        </button>
      </div>

      {/* 현재 단계 인디케이터 */}
      <div className="w-full h-[40px] flex items-center justify-start px-4 py-2">
        <img src="/icons/indicator_2.svg" alt="현재 위치" />
      </div>

      {/* 제목 */}
      <div className="w-full h-[48px] flex items-start justify-start px-5 py-[6px]">
        <h2 className={`${TYPOGRAPHY.HEADING2} leading-snug`}>프로필 설정</h2>
      </div>

      {/* 설명 문구 */}
      <div className="w-full px-[17px] py-4">
        <p className={`${TYPOGRAPHY.BODY3} leading-snug`}>
          다른 사용자가 볼 수 있도록 프로필을 설정해주세요.
        </p>
      </div>

      {/* 프로필 사진 (추후 업로드 기능 연결 가능) */}
      <div className="flex justify-center w-full py-3">
        <div className="w-[88px] h-[88px] rounded-full bg-gray-200" />
      </div>

      {/* 닉네임 입력 & 중복확인 */}
      <div className="flex flex-row items-start justify-center w-full gap-3 px-5 py-2 h-[118px]">
        <p className={`${TYPOGRAPHY.TITLE2} w-[79px] h-12 px-4 py-[13px]`}>닉네임</p>
        <div className="w-64 h-full">
          {/* 입력창 */}
          <input
            value={nickname}
            onChange={e => {
              setNickname(e.target.value);
              setIsNicknameChecked(false); // ✅ 닉네임 수정 시 중복확인 상태 초기화
            }}
            type="text"
            placeholder="국문 · 영문 2-8자"
            style={{ backgroundColor: COLORS.GRAYSCALE.G1 }}
            className="w-full h-[48px] px-4 rounded-[8px]"
          />
          {/* 중복확인 버튼 */}
          <button
            onClick={handleCheckNickname}
            style={{
              backgroundColor: isNicknameValid ? '#000000' : COLORS.GRAYSCALE.G6,
              color: '#FFFFFF',
            }}
            className={`${TYPOGRAPHY.BODY2} w-full h-[40px] mt-4 rounded-[8px]`}
          >
            닉네임 중복확인
          </button>
        </div>
      </div>

      {/* 성별 선택 */}
      <div className="flex flex-row items-start justify-center w-full h-16 gap-3 px-5 py-2">
        <p className={`${TYPOGRAPHY.TITLE2} w-[79px] h-12 px-4 py-[13px]`}>성별</p>
        <div className={`${TYPOGRAPHY.BODY3} flex w-[250px] h-12 gap-5`}>
          <button
            onClick={() => setGender('남성')}
            style={{
              backgroundColor: gender === '남성' ? '#000000' : COLORS.GRAYSCALE.G1,
              color: gender === '남성' ? '#FFFFFF' : COLORS.GRAYSCALE.G6,
            }}
            className="h-12 border rounded-md w-28"
          >
            남성
          </button>
          <button
            onClick={() => setGender('여성')}
            style={{
              backgroundColor: gender === '여성' ? '#000000' : COLORS.GRAYSCALE.G1,
              color: gender === '여성' ? '#FFFFFF' : COLORS.GRAYSCALE.G6,
            }}
            className="h-12 border rounded-md w-28"
          >
            여성
          </button>
        </div>
      </div>

      {/* 학사 선택 */}
      <div className="flex flex-row items-start justify-center w-full h-16 gap-3 px-5 py-2">
        <p className={`${TYPOGRAPHY.TITLE2} w-[79px] h-12 px-4 py-[13px]`}>학사</p>
        <select
          value={degree}
          onChange={e => setDegree(e.target.value)}
          style={{ backgroundColor: COLORS.GRAYSCALE.G1, color: COLORS.GRAYSCALE.G6 }}
          className="w-[250px] h-12 px-4 rounded-md"
        >
          <option disabled value="" className="text-gray-400">
            선호하는 학사를 선택해주세요
          </option>
          <option className="text-gray-800">매지학사1</option>
          <option className="text-gray-800">매지학사2</option>
          <option className="text-gray-800">매지학사3_남</option>
          <option className="text-gray-800">매지학사3_여</option>
          <option className="text-gray-800">세연학사1</option>
          <option className="text-gray-800">세연학사2</option>
          <option className="text-gray-800">세연학사3</option>
          <option className="text-gray-800">청연학사1</option>
          <option className="text-gray-800">청연학사2</option>
        </select>
      </div>

      {/* 작성 완료 버튼 */}
      <div className="w-full px-5 py-6">
        <button
          disabled={!isFormValid}
          onClick={() => navigate('/Lifestylepattern')}
          className={`w-full h-[48px] rounded-md mt-4 ${
            isFormValid ? 'bg-black text-white' : 'bg-gray-300 text-white'
          }`}
        >
          작성 완료
        </button>
      </div>

      {/* 사용 가능한 닉네임 모달 */}
      {showAvailableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl w-[336px] h-[184px] text-center">
            <div className="py-10">
              <p className={`${TYPOGRAPHY.BODY3} px-[86.5px] py-[12.5px] text-black`}>
                사용 가능한 닉네임입니다.
              </p>
            </div>
            <Button
              className="w-full h-[56px] bg-black text-white border-none rounded-b-lg rounded-t-none"
              onClick={handleConfirmAvailableModal}
            >
              확인
            </Button>
          </div>
        </div>
      )}

      {/* 사용할 수 없는 닉네임 모달 (API 연동 시 조건 분기로 사용 예정) */}
      {showUnavailableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl w-[336px] h-[184px] text-center">
            <div className="py-10">
              <p className={`${TYPOGRAPHY.BODY3} px-[86.5px] py-[12.5px] text-black`}>
                사용할 수 없는 닉네임입니다.
              </p>
            </div>
            <Button
              className="w-full h-[56px] bg-black text-white border-none rounded-b-lg rounded-t-none"
              onClick={() => setShowUnavailableModal(false)}
            >
              확인
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setup;
