package HouseWith.hwf.domain.JoinRequest;

import HouseWith.hwf.DTO.ArticleDTO;
import HouseWith.hwf.DTO.QArticleDTO;
import HouseWith.hwf.domain.Article.QArticle;
import HouseWith.hwf.domain.JoinRequest.Custom.JoinStatus;
import com.querydsl.core.types.dsl.Wildcard;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static HouseWith.hwf.domain.Article.QArticle.article;
import static HouseWith.hwf.domain.JoinRequest.QJoinRequest.joinRequest;
import static HouseWith.hwf.domain.Member.QMember.member;

@RequiredArgsConstructor
public class JoinRequestRepositoryImpl implements JoinRequestRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    @PersistenceContext
    private EntityManager em;

    @Override
    public Long countByMember(Long memberId) {
        Long requests = queryFactory
                .select(joinRequest.count())
                .from(joinRequest)
                .where(joinRequest.member.id.eq(memberId))
                .fetchOne();
        return requests == null ? 0L : requests;
    }

    @Override
    public Long countByArticle(Long articleId) {
        Long cnt = queryFactory
                .select(joinRequest.count())
                .from(joinRequest)
                .where(joinRequest.article.id.eq(articleId) ,
                        joinRequest.joinStatus.in(JoinStatus.OWNER , JoinStatus.ACCEPTED))
                .fetchOne();
        return cnt != null ? cnt : 0L;
    }

    @Override
    public JoinRequest findByMember(long memberId , long articleId) {
        return queryFactory
                .selectFrom(joinRequest)
                .join(joinRequest.article , article)
                .join(joinRequest.member , member)
                .where(article.id.eq(articleId) ,
                        member.id.eq(memberId))
                .fetchOne();
    }
}
