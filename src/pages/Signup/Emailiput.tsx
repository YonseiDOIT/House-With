import { useState, useEffect } from 'react';
import { COLORS } from '../../constants/colors';
import Button from '../../components/Button/Button';
import { TYPOGRAPHY } from '../../constants/typography';
import { useNavigate } from 'react-router-dom';

const EmailinputPage = () => {
  // 사용자 입력 상태 관리
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  // 타이머 상태 (초 단위), 초기값 2분
  const [timeLeft, setTimeLeft] = useState(120);

  // 화면 단계 관리: 이메일 입력(input), 전송됨(sent), 인증번호 입력(verify)
  const [step, setStep] = useState<'input' | 'sent' | 'verify'>('input');

  // 인증 실패 시 모달 표시 상태
  const [isVerifyFailed, setIsVerifyFailed] = useState(false);

  // 페이지 이동을 위한 navigate 함수
  const navigate = useNavigate();

  // 학교 이메일인지 여부 판단
  const isEmailValid = email.includes('@yonsei.ac.kr');

  // 인증번호가 8자리 숫자인지 정규식으로 체크
  const isCodeValid = /^\d{8}$/.test(code);

  // step이 'verify'일 때 타이머 작동시키는 useEffect
  useEffect(() => {
    if (step !== 'verify' || isCodeValid) return; // 인증 완료되면 타이머 멈춤
    if (timeLeft <= 0) return; // 시간이 다 되면 타이머 종료

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1); // 매초 1초씩 감소
    }, 1000);

    return () => clearInterval(timer); // 언마운트 또는 조건 변할 때 타이머 제거
  }, [step, timeLeft, isCodeValid]);

  // 초 단위 시간을 mm:ss 형식 문자열로 변환
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  // 이메일 전송 버튼 클릭 시 실행
  const handleSendEmail = () => {
    if (isEmailValid) {
      console.log('메일 전송');
      // 실제 메일 전송 로직 필요
      setStep('sent'); // 이메일 전송 완료 모달로 전환
    }
  };

  // 인증번호 검증 함수 (API 호출 시뮬레이션 포함)
  const handleVerify = async () => {
    try {
      const result = await verifyCodeAPI(code); // 실제 서버 요청 필요
      if (result.success) {
        navigate('/setup'); // 인증 성공 시 다음 페이지로 이동
      } else {
        setIsVerifyFailed(true); // 실패 시 실패 모달 표시
      }
    } catch (err) {
      console.error(err); // 네트워크 오류 등 예외 처리
      setIsVerifyFailed(true);
    }
  };

  // 인증번호 검증 API 시뮬레이션 (프론트엔드 테스트용)
  const verifyCodeAPI = async (code: string) => {
    // 실제에선 fetch/axios 등으로 서버에 요청할 것
    return new Promise<{ success: boolean }>(resolve => {
      setTimeout(() => {
        resolve({ success: code === '12345678' }); // 12345678이 정답인 상태
      }, 500);
    });
  };

  return (
    <div className="flex flex-col items-start justify-start w-full max-w-[375px] mx-auto min-h-screen py-6 bg-white">
      {/* 뒤로가기 버튼 */}
      <div className="w-full h-[48px] flex items-center justify-start px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
          className="w-8 h-8 px-0 py-0 bg-transparent"
        >
          <img src="../public/icons/chevron_left.svg" alt="뒤로가기" />
        </button>
      </div>

      {/* 인디케이터 */}
      <div className="w-full h-[40px] flex items-center justify-start px-4 py-2">
        <img src="../public/icons/indicator_1.svg" alt="현재 위치" />
      </div>

      {/* 제목 */}
      <div className="w-full h-[48px] flex items-start justify-start px-5 py-[6px]">
        <h2 className={`${TYPOGRAPHY.HEADING2} w-21 h-[36px] leading-snug`}>학교 인증</h2>
      </div>

      {/* 안내 문구 */}
      <div className="flex items-center justify-center w-full h-[48px] px-5 py-4 mb-12">
        <p className={`${TYPOGRAPHY.BODY3} ${COLORS.GRAYSCALE.B} leading-snug`}>
          하우스윗 사용을 위해서는 학교 메일 인증이 필요해요
        </p>
      </div>

      {/* 이메일 입력 단계 화면 */}
      {step === 'input' && (
        <>
          {/* 이메일 입력 필드 */}
          <div className="flex justify-center w-full h-16 px-5 py-2 mb-16">
            <input
              type="email"
              placeholder="example@yonsei.ac.kr"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-[336px] h-[48px] px-5 py-2 mb-[14.5px] border border-gray-300 rounded-lg"
            />
          </div>

          {/* 전송 버튼 */}
          <div className="flex items-center justify-center w-full h-16 px-5 py-4">
            <Button size="xl" disabled={!isEmailValid} onClick={handleSendEmail}>
              {isEmailValid ? '메일 전송하기' : '학교 인증하기'}
            </Button>
          </div>
        </>
      )}

      {/* 인증번호 입력 단계 화면 */}
      {step === 'verify' && (
        <>
          {/* 인증번호 입력 필드 */}
          <div className="flex justify-center w-full h-16 px-5 py-2 mb-16">
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="인증번호 입력하기"
              maxLength={8}
              className="w-[336px] h-[48px] px-2 py-5 border border-gray-300 rounded-lg"
            />
          </div>

          {/* 인증 버튼 (8자리 입력 시 활성화) */}
          <div className="flex items-center justify-center w-full h-16 px-5 py-4">
            <Button size="xl" disabled={!isCodeValid || timeLeft <= 0} onClick={handleVerify}>
              {isCodeValid ? '인증 완료' : `남은 시간 ${formatTime(timeLeft)}`}
            </Button>
          </div>

          {/* 이메일 재전송 버튼 (타이머 초기화) */}
          <div className="flex flex-col items-center justify-center w-full px-5 py-2 mb-4 space-y-2">
            <Button
              size="xl"
              onClick={() => {
                setTimeLeft(120); // 타이머 초기화
                console.log('이메일 재전송');
              }}
            >
              이메일 재전송
            </Button>
          </div>

          {/* 하단 안내 (문의하기 링크) */}
          <div className="flex space-x-14 justify-center w-full h-[64px] px-11 py-5 ">
            <p
              style={{ color: COLORS.GRAYSCALE.G6 }}
              className={`${TYPOGRAPHY.BODY3} leading-snug`}
            >
              메일이 오지 않았나요?{''}
            </p>
            <p
              style={{ color: COLORS.GRAYSCALE.G6 }}
              onClick={() => navigate('/emailinput')}
              className={`${TYPOGRAPHY.TITLE1} leading-snug`}
            >
              문의하기
            </p>
          </div>
        </>
      )}

      {/* 이메일 전송 완료 모달 (단계: sent) */}
      {step === 'sent' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl w-[336px] h-[184px] text-center">
            <h2 className={`${TYPOGRAPHY.BODY3} ${COLORS.GRAYSCALE.B} py-4 mt-4 font-semibold`}>
              이메일 전송 완료
            </h2>
            <p className={`${TYPOGRAPHY.BODY3} ${COLORS.GRAYSCALE.B} py-1`}>
              메일함을 확인해주세요
            </p>
            <Button
              className="w-full h-[56px] bg-black mt-6 border-none rounded-b-lg rounded-t-none"
              onClick={() => setStep('verify')} // 확인 시 인증단계로 이동
            >
              확인
            </Button>
          </div>
        </div>
      )}

      {/* 인증 실패 모달 */}
      {isVerifyFailed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl w-[336px] h-[184px] text-center">
            <h2 className={`${TYPOGRAPHY.BODY3} ${COLORS.GRAYSCALE.B} py-4 mt-4 font-semibold`}>
              인증 실패
            </h2>
            <p className={`${TYPOGRAPHY.BODY3} ${COLORS.GRAYSCALE.B} py-1`}>
              인증 번호를 확인해주세요.
            </p>
            <Button
              className="w-full h-[56px] bg-black mt-6 border-none rounded-b-lg rounded-t-none"
              onClick={() => setIsVerifyFailed(false)} // 모달 닫기
            >
              확인
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailinputPage;
