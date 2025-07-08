package HouseWith.hwf.web.JoinMate.Service;

import HouseWith.hwf.DTO.ArticleDTO;
import HouseWith.hwf.DTO.JoinRequestDTO;
import HouseWith.hwf.DTO.MemberDTO;
import HouseWith.hwf.Exceptions.RequestExceptioons.ArticleNotFoundException;
import HouseWith.hwf.domain.Article.Article;
import HouseWith.hwf.domain.Article.ArticleRepository;
import HouseWith.hwf.domain.JoinRequest.JoinRequest;
import HouseWith.hwf.domain.JoinRequest.Custom.JoinStatus;
import HouseWith.hwf.domain.JoinRequest.JoinRequestRepository;
import HouseWith.hwf.domain.Member.Member;
import HouseWith.hwf.domain.Member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class JoinMateService {
    private final ArticleRepository articleRepository;
    private final MemberRepository memberRepository;
    private final JoinRequestRepository joinRequestRepository;

    static String ERROR = "잘못된 요청입니다. ERROR CODE : ";

    @Value("${ErrorCode.Request.UNAVAILABLE_REQUEST_NULL}")
    private String error_NULL;

    @Value("${ErrorCode.Request.REQUEST_OVERFLOW}")
    private String error_OVERFLOW;

    public void ToJoin(
            Long articleId ,
            Long memberId
    ) {
        if (joinRequestRepository.countByMember(memberId) > 3)
            throw new IllegalStateException(ERROR + error_OVERFLOW);

        Article article =
                articleRepository.findArticlesById(articleId);

        if (article == null) throw new IllegalStateException(ERROR + error_NULL);

        Member member =
                memberRepository.findByMemberId(memberId);


        if (member == null)
            throw new IllegalStateException(ERROR + error_NULL);

        JoinRequest join = new JoinRequest(
                article , member , JoinStatus.WAITING
        );

        joinRequestRepository.save(join);
    }

}
