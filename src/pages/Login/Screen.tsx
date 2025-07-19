import { COLORS } from '../../constants/colors';
import Button from '../../components/Button/Button';
import { TYPOGRAPHY } from '../../constants/typography';
import { useNavigate } from 'react-router-dom';

const Screen = () => {
  const navigate = useNavigate();

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
      <div className="w-full h-[88px] flex items-start justify-start px-6 py-4 mb-4">
        <h2 className={`${TYPOGRAPHY.HEADING2} leading-snug`}>
          잘맞는 룸메이트,
          <br />
          이제 하우스윗에서 만나요
        </h2>
      </div>

      {/* 중간: 이모지 */}
      <div className="mb-12">
        <img src="../public/image/login.svg" alt="집 이모지" className="w-full h-[288px] mx-auto" />
      </div>

      {/* 하단: 로그인 버튼_카카오 */}
      <div className="flex items-center justify-center w-full h-[64px] px-6">
        <Button
          onClick={() => navigate('/emailinput')}
          className="w-[336px] h-[48px] p-0 bg-[#FEE500] rounded-[10px]"
        >
          <img
            src="/image/kakao_login.png"
            alt="카카오 로그인"
            className="object-contain h-[48px] w-[336px]"
          />
        </Button>
      </div>

      {/* 하단: 로그인 버튼_네이버 */}
      <div className="flex items-center justify-center w-full h-[64px] px-6 mt-2">
        <button
          onClick={() => navigate('/emailinput')}
          className="flex flex-row items-center justify-center w-[336px] h-[48px] p-0 bg-[#03C75A] rounded-[10px] gap-2
          "
        >
          <img
            src="/image/naver_login.png"
            alt="네이버 로그인"
            className="object-contain w-9 h-9"
          />
          <p className={`${TYPOGRAPHY.BODY3} leading-snug w-24 h-5`}>네이버 로그인</p>
        </button>
      </div>

      <div className="flex items-center justify-center w-full h-[64px] px-6">
        <p style={{ color: COLORS.GRAYSCALE.G6 }} className={`${TYPOGRAPHY.BODY3} leading-snug`}>
          아직 하우스윗의 회원이 아니신가요? {''}
          <span
            style={{ color: COLORS.GRAYSCALE.G6 }}
            onClick={() => navigate('/emailinput')}
            className={`${TYPOGRAPHY.TITLE1} leading-snug`}
          >
            회원가입하기
          </span>
        </p>
      </div>
    </div>
  );
};

export default Screen;
