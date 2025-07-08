package HouseWith.hwf.domain.JoinRequest;

import HouseWith.hwf.DTO.ArticleDTO;
import HouseWith.hwf.DTO.QArticleDTO;
import HouseWith.hwf.domain.JoinRequest.Custom.JoinStatus;
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
                .where(member.id.eq(memberId))
                .fetchOne();
        return requests == null ? 0L : requests;
    }
}
