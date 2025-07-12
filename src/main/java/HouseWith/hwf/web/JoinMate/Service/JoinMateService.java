package HouseWith.hwf.web.JoinMate.Service;

import HouseWith.hwf.Exceptions.RequestExceptioons.IllegalParamException;
import HouseWith.hwf.domain.Article.Article;
import HouseWith.hwf.domain.Article.ArticleRepository;
import HouseWith.hwf.domain.JoinRequest.JoinRequest;
import HouseWith.hwf.domain.JoinRequest.Custom.JoinStatus;
import HouseWith.hwf.domain.JoinRequest.JoinRequestRepository;
import HouseWith.hwf.domain.Member.Member;
import HouseWith.hwf.domain.Member.MemberRepository;
import HouseWith.hwf.domain.Member.MemberRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;


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

    @Value("${ErrorCode.Request.VALUE_DUPLICATED}")
    private String error_DUPLICATED;

    /**
     * @param ownerId : 방을 생성한 사람의 ID
     * @param articleId : 방 ID
     * @param memberId : 가입 신청한 사람의 ID
     *
     * 7/8 - 수정
     * 비효율적인 쿼리문 개선
     *
     * 중복 인원 가입 불가 처리 개발 필요 -> 수정 완료
     * 가입 가능 인원 제한 설정 - 추가 개발 필요 (일단 3명까지만 해놓음) -> 수정 완료
     */

    public void ToJoin(
            long ownerId ,
            long articleId ,
            long memberId
    ) {
        //중복 인원 가입 신청 예외처리 안해놓음 -> 수정 완료
        Article article =
                articleRepository.findArticlesById(articleId);

        //인원 수 제한 설정
        if (article == null)
            throw new IllegalStateException(ERROR + error_NULL + "해당하는 방이 없습니다.");

        long val = joinRequestRepository.countByMember(memberId);
        if (val > article.getAccess_max()) {
            throw new IllegalStateException(ERROR + error_OVERFLOW);
        }

        Member member =
                memberRepository.findByMemberId(memberId);
        List<Member> memberList =
                memberRepository.findAllRequestByArticleId(articleId);

        //받아올 멤버가 없는 경우
        if (member == null )
            throw new IllegalStateException(ERROR + error_NULL + " : 해당하는 멤버가 없습니다.");

        //중복 멤버가 껴있는 경우
        //모든 리스트에서 멤버 id 를 대조 비교 (신청자 or 소육자)
        for (Member member_in : memberList) {
            if (Objects.equals(member_in.getId().toString(), String.valueOf(memberId)))
                throw new IllegalStateException(ERROR + error_DUPLICATED + " : ");
        }

        article.add_JoinMember_count(article.getJoin_member_count());
        article.set_owner(ownerId);

        JoinRequest join = new JoinRequest(
                article , member , JoinStatus.WAITING
        );

        joinRequestRepository.save(join);
        articleRepository.save(article);
    }

}
