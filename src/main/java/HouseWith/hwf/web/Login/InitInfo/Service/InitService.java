package HouseWith.hwf.web.Login.InitInfo.Service;

import HouseWith.hwf.DTO.LivingPatternDTO;
import HouseWith.hwf.domain.LivingPattern.LivingPattern;
import HouseWith.hwf.domain.Member.Member;
import HouseWith.hwf.domain.Member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class InitService {
    public Member authUniv(String email) {
        return new Member(email);
    }

    public Member getInitData(
            String nickname ,
            String sex ,
            String dormitoryName) {
        return new Member(
                nickname , sex , dormitoryName
        );
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
