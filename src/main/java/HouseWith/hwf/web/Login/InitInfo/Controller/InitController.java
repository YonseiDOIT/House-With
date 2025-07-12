package HouseWith.hwf.web.Login.InitInfo.Controller;

import HouseWith.hwf.DTO.LivingPatternDTO;
import HouseWith.hwf.domain.Member.Member;
import HouseWith.hwf.domain.Member.MemberRepository;
import HouseWith.hwf.web.Login.InitInfo.Service.InitService;
import HouseWith.hwf.web.Login.Security.JWT.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("user-info")
public class InitController {
    private final MemberRepository memberRepository;
    private final InitService initService;
    private final JwtUtil jwtUtil;

    @Value("${univcert.key}")
    private String UNIV_CERT_KEY;

    /**
     * @param YonseiEmail : 학교 인증에 필요한 이메일
     * @return : 반환값은 학교 인증 여부 + 학교 재학 여부 모두 반환
     *
     * 논점 - 학교 인증이 꼭 필요한지???
     */
    //@PostMapping("univAuth")
    public ResponseEntity<?> UnivCertification_email(
            @RequestParam String YonseiEmail ,
            @RequestParam Long memberId) throws IOException {
//        Map<String , Object> cert_values = UnivCert.certify(
//                UNIV_CERT_KEY ,
//                YonseiEmail ,
//                "연세대학교 미래캠퍼스" ,
//                true
//                );
        Member member = memberRepository.findByMemberId(memberId);
//        boolean cert_check = (boolean) cert_values.get("success");
        //인증 완료한 이메일인 경우 저장

//        memberRepository.save(initService.authUniv(YonseiEmail));


        return ResponseEntity.ok("인증코드 전송");
    }

    /**
     * 6/27 - 생성
     * @param YonseiEmail
     * @param nickname
     * @param sex
     * @param dormitoryName
     * @return
     *
     * 7/8 - 수정 완료 , 테스트 완료
     */
    @PostMapping("basicInfo")
    public ResponseEntity<?> SignIn(
            @RequestParam(value = "email") String YonseiEmail,
            @RequestParam String nickname,
            @RequestParam String sex ,
            @RequestParam(value = "dormitory") String dormitoryName) {
        Member member = initService.getInitData(
                "user1" , "password!" , YonseiEmail , nickname , sex , dormitoryName
        );

//        String jwt = jwtUtil.genToken(
//                member.getId() ,
//                member.getEmail(),
//                member.getNickname()
//        );

        memberRepository.save(member);
        return ResponseEntity.ok("userID :" + member.getId());
    }

    /**
     * 7/8 - 구현 완료
     * @param nickname : 중복 검사할 닉네임
     * @return : ok -> 중복 있음
     */
    @GetMapping("nickDup")
    public ResponseEntity<?> NickDup(
            @RequestParam String nickname
    ) {
        return initService.nickDuplicateCheck(nickname) ?
               ResponseEntity.ok("DUPLICATED") : ResponseEntity.ok("NOT_DUPLICATED");
    }

    /**
     * 7/6 - 개발 완료
     * @param livingPatternDTO : 개인 생활 패턴을 받아오는 DTO
     * @return : 받아서 저장합니다. -> 수정 기능은 추후에 개발
     */
    @PostMapping("patternInfo")
    public ResponseEntity<?> PatternInfo(
            @RequestBody LivingPatternDTO livingPatternDTO) {
        memberRepository
                .save(initService.getLivingPattern(livingPatternDTO));
        return ResponseEntity.ok().build();
    }
}
