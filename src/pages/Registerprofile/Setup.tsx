// React 훅 및 라우터 이동 기능, 상수 정의, 공통 컴포넌트 import
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TYPOGRAPHY } from '../../constants/typography';
import { COLORS } from '../../constants/colors';
import Button from '../../components/Button/Button';
import CustomSelect from '../../components/CustomSelect';

const Setup = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 라우터 훅

  const dormitoryEnumMap: Record<string, string> = {
    매지학사1: 'MAEJI_1',
    매지학사2: 'MAEJI_2',
    매지학사3_남: 'MAEJI_3_MALE',
    매지학사3_여: 'MAEJI_3_FEMALE',
    세연학사1: 'SEYEON_1',
    세연학사2: 'SEYEON_2',
    세연학사3: 'SEYEON_3',
    청연학사1: 'CHEONGYEON_1',
    청연학사2: 'CHEONGYEON_2',
  };

  // ========================================
  // 사용자 입력 값 상태 정의 (닉네임, 성별, 학사 선택)
  // ========================================
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const [degree, setDegree] = useState('');

  // ========================================
  // 닉네임 중복 확인 여부 및 모달 상태
  // ========================================
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [showAvailableModal, setShowAvailableModal] = useState(false); // 사용 가능 모달
  const [showUnavailableModal, setShowUnavailableModal] = useState(false); // 사용 불가 모달

  // 닉네임 유효성 검사 (2~8자)
  const isNicknameValid = nickname.length >= 2 && nickname.length <= 8;

  // 전체 입력 유효성 (모든 항목 입력 + 닉네임 중복확인 완료)
  const isFormValid = isNicknameChecked && gender && degree;

  // ========================================
  // 닉네임 중복 확인 API 요청 함수
  // ========================================
  const handleCheckNickname = async () => {
    if (!isNicknameValid) {
      alert('닉네임은 2~8자 사이로 입력해주세요.');
      return;
    }

    try {
      const response = await fetch(
        `http://ec2-52-78-243-69.ap-northeast-2.compute.amazonaws.com:8080/user-info/nickDup?nickname=${encodeURIComponent(nickname)}`
      );

      const result = await response.text(); // ⚠️ 문자열 응답 읽기

      if (result === 'DUPLICATED') {
        setShowUnavailableModal(true); // 사용 불가 모달
        setIsNicknameChecked(false); // 중복이므로 유효하지 않음
      } else if (result === 'NOT_DUPLICATED') {
        setShowAvailableModal(true); // 사용 가능 모달
        setIsNicknameChecked(true); // 사용 가능하므로 true
      } else {
        alert(`예상치 못한 응답: ${result}`);
      }
    } catch (error) {
      console.error('닉네임 중복 확인 오류:', error);
      alert('서버 연결 중 문제가 발생했습니다.');
    }
  };

  // 사용 가능 모달에서 '확인' 클릭 시
  const handleConfirmAvailableModal = () => {
    setShowAvailableModal(false);
    setIsNicknameChecked(true);
  };

  // 기숙사 옵션: 성별에 따라 다르게 설정
  const maleDormitories = ['매지학사1', '매지학사3_남', '세연학사1', '세연학사2', '청연학사1'];
  const femaleDormitories = ['매지학사2', '매지학사3_여', '세연학사3', '청연학사2'];

  return (
    <div className="flex flex-col items-start justify-start w-full max-w-[375px] mx-auto min-h-screen py-6">
      {/* === 상단 뒤로가기 버튼 === */}
      <div className="w-full h-[48px] flex items-center justify-start px-4 py-3">
        <button aria-label="뒤로가기" className="w-8 h-8 px-0 py-0 bg-transparent">
          <img src="/icons/chevron_left.svg" alt="뒤로가기" />
        </button>
      </div>

      {/* === 현재 스텝 인디케이터 === */}
      <div className="w-full h-[40px] flex items-center justify-start px-4 py-2">
        <img src="/icons/indicator_2.svg" alt="현재 위치" />
      </div>

      {/* === 페이지 제목 === */}
      <div className="w-full h-[48px] flex items-start justify-start px-5 py-[6px]">
        <h2 className={`${TYPOGRAPHY.HEADING2} leading-snug`}>프로필 설정</h2>
      </div>

      {/* === 안내 문구 === */}
      <div className="w-full px-[17px] py-4">
        <p className={`${TYPOGRAPHY.BODY3} leading-snug`}>
          다른 사용자가 볼 수 있도록 프로필을 설정해주세요.
        </p>
      </div>

      {/* === 프로필 이미지 업로드 영역 (현재는 고정 이미지) === */}
      <div className="flex justify-center w-full">
        <div className="w-[88px] h-[88px] rounded-full bg-gray-200 flex items-center justify-center">
          <img src="../public/icons/mypage_edit-contained.svg" />
        </div>
      </div>

      {/* === 닉네임 입력 + 중복확인 버튼 === */}
      <div className="flex flex-row items-start justify-center w-full h-auto gap-3 px-5 py-4">
        <p className={`${TYPOGRAPHY.TITLE2} w-[79px] h-12 px-4 py-[13px]`}>닉네임</p>
        <div className="w-64 h-full">
          <input
            value={nickname}
            onChange={e => {
              setNickname(e.target.value);
              setIsNicknameChecked(false); // 수정 시 중복확인 초기화
            }}
            type="text"
            placeholder="국문 · 영문 2-8자"
            style={{ borderColor: COLORS.GRAYSCALE.G6, color: COLORS.GRAYSCALE.G6 }}
            className="w-full h-[48px] px-4 rounded-[8px] border"
          />
          <button
            onClick={handleCheckNickname}
            style={{
              backgroundColor: isNicknameValid ? '#000000' : COLORS.GRAYSCALE.G6,
              color: '#FFFFFF',
            }}
            className={`${TYPOGRAPHY.BODY2} w-full h-12 mt-4 rounded-[8px]`}
          >
            닉네임 중복확인
          </button>
        </div>
      </div>

      {/* === 성별 선택 버튼 === */}
      <div className="flex flex-row items-start justify-center w-full h-16 gap-3 px-5">
        <p className={`${TYPOGRAPHY.TITLE2} w-[79px] h-12 px-4 py-[13px]`}>성별</p>
        <div className={`${TYPOGRAPHY.BODY3} flex w-[250px] h-12 gap-5`}>
          <button
            onClick={() => {
              setGender('남성');
              setDegree(''); // 성별 변경 시 학사 초기화
            }}
            style={{
              backgroundColor: gender === '남성' ? '#000000' : COLORS.GRAYSCALE.G1,
              color: gender === '남성' ? '#FFFFFF' : COLORS.GRAYSCALE.G6,
            }}
            className="h-12 border rounded-md w-28"
          >
            남성
          </button>
          <button
            onClick={() => {
              setGender('여성');
              setDegree('');
            }}
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

      {/* === 학사 선택 드롭다운 === */}
      <div className="flex flex-row items-start justify-center w-full h-16 gap-3 px-5">
        <p className={`${TYPOGRAPHY.TITLE2} w-[79px] h-12 px-4 py-[13px]`}>학사</p>

        {/* 성별이 선택되었을 경우에만 드롭다운 보여줌 */}
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

      {/* === 작성 완료 버튼 === */}
      <div className="w-full px-5">
        <button
          disabled={!isFormValid}
          onClick={async () => {
            const email = localStorage.getItem('email');
            if (!email) {
              alert('이메일 정보가 없습니다.');
              return;
            }

            const genderEnum = gender === '남성' ? 'MALE' : 'FEMALE';
            const dormitoryEnum = dormitoryEnumMap[degree];

            const query = new URLSearchParams({
              email,
              nickname,
              sex: genderEnum,
              dormitory: dormitoryEnum,
            }).toString();

            try {
              const response = await fetch(
                `http://ec2-52-78-243-69.ap-northeast-2.compute.amazonaws.com:8080/user-info/basicInfo?${query}`,
                {
                  method: 'POST',
                }
              );

              if (response.ok) {
                navigate('/Lifestylepattern'); // 다음 페이지 이동
              } else {
                alert('회원가입에 실패했습니다.');
              }
            } catch (error) {
              console.error('회원가입 오류:', error);
              alert('서버와 통신 중 문제가 발생했습니다.');
            }
          }}
          style={{
            backgroundColor: isFormValid ? COLORS.GRAYSCALE.B : COLORS.GRAYSCALE.G6,
            color: COLORS.GRAYSCALE.F,
          }}
          className={`${TYPOGRAPHY.BODY3} w-full h-[48px] rounded-md mt-4`}
        >
          작성 완료
        </button>
      </div>

      {/* === 닉네임 사용 가능 모달 === */}
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

      {/* === 닉네임 중복 모달 === */}
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
