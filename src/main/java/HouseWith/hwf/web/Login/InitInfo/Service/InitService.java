package HouseWith.hwf.web.Login.InitInfo.Service;

import HouseWith.hwf.DTO.LivingPatternDTO;
import HouseWith.hwf.Exceptions.RequestExceptioons.IllegalJoinStatusException;
import HouseWith.hwf.Exceptions.RequestExceptioons.IllegalParamException;
import HouseWith.hwf.domain.LivingPattern.LivingPattern;
import HouseWith.hwf.domain.Member.Member;
import HouseWith.hwf.domain.Member.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class InitService {
    private final MemberRepository memberRepository;

    static String CHECK = "중복 확인 요청입니다.";


    public Member getInitData(
            String username,
            String password,
            String email ,
            String nickname ,
            String sex ,
            String dormitoryName) {

        if (memberRepository.existsByNickname(nickname))
            throw new IllegalParamException(CHECK);

        return new Member(
                username , password , email , nickname , sex , dormitoryName
        );
    }

    /**
     * 7/6 - 개발 완료
     * @param nickname : 중복 검사할 닉네임
     * @return : true = 중복된 닉네임 있음 / false = 중복된 닉네임 없음
     */
    public boolean nickDuplicateCheck(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    public Member getLivingPattern(LivingPatternDTO livingPatternDTO) {
        LivingPattern livingPattern = new LivingPattern(
                livingPatternDTO.getSleep_pattern() ,
                livingPatternDTO.getSnoring() ,
                livingPatternDTO.getNight_work() ,
                livingPatternDTO.getHome_leaving() ,
                livingPatternDTO.getShower_pattern() ,
                livingPatternDTO.getSharing() ,
                livingPatternDTO.getSpeaker_use() ,
                livingPatternDTO.getCall_pattern() ,
                livingPatternDTO.getIntrovert() ,
                livingPatternDTO.getSanitary() ,
                livingPatternDTO.getSmoke() ,
                livingPatternDTO.getAvailable_eat()
        );

        return new Member(livingPattern);
    }

}
