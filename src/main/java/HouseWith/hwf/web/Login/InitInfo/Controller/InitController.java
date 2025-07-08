package HouseWith.hwf.web.Login.InitInfo.Controller;

import HouseWith.hwf.DTO.LivingPatternDTO;
import HouseWith.hwf.domain.LivingPattern.LivingPatternRepository;
import HouseWith.hwf.domain.Member.Member;
import HouseWith.hwf.domain.Member.MemberRepository;
import HouseWith.hwf.domain.Member.MemberRepositoryCustom;
import HouseWith.hwf.web.Login.InitInfo.Service.InitService;
import com.univcert.api.UnivCert;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.transform.Result;
import java.io.IOException;
import java.util.Map;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("user-info")
public class InitController {
    private final MemberRepository memberRepository;
    private final InitService initService;

    @Value("${univcert.key}")
    private String UNIV_CERT_KEY;


    /**
     * @param YonseiEmail : 학교 인증에 필요한 이메일
     * @return : 반환값은 학교 인증 여부 + 학교 재학 여부 모두 반환
     *
     * 논점 - 학교 인증이 꼭 필요한지???
     */
    @PostMapping("univAuth")
    public ResponseEntity<?> UnivCertification_email(@RequestParam String YonseiEmail) throws IOException {
        Map<String , Object> cert_values = UnivCert.certify(
                UNIV_CERT_KEY ,
                YonseiEmail ,
                "연세대학교 미래캠퍼스" ,
                true
                );

        boolean cert_check = (boolean) cert_values.get("success");
        //인증 완료한 이메일인 경우 저장

        memberRepository.save(initService.authUniv(YonseiEmail));


        return ResponseEntity.ok("인증코드 전송");
    }

    @PostMapping("basicInfo")
    public ResponseEntity<?> SignIn(
            @RequestParam String nickname,
            @RequestParam String sex ,
            @RequestParam String dormitoryName) {
        memberRepository.save(initService.getInitData(
                nickname , sex , dormitoryName
        ));
        return ResponseEntity.ok().build();
    }

    @PostMapping("patternInfo")
    public ResponseEntity<?> PatternInfo(@RequestBody LivingPatternDTO livingPatternDTO) {
        memberRepository.save(initService.getLivingPattern(livingPatternDTO));
        return ResponseEntity.ok().build();
    }
}
