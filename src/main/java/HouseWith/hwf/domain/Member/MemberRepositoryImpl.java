package HouseWith.hwf.domain.Member;

import HouseWith.hwf.DTO.MemberDTO;
import HouseWith.hwf.DTO.QMemberDTO;
import HouseWith.hwf.domain.JoinRequest.Custom.JoinStatus;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

import static HouseWith.hwf.domain.JoinRequest.QJoinRequest.joinRequest;
import static HouseWith.hwf.domain.Member.QMember.member;

@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepositoryCustom{
    @PersistenceContext
    private EntityManager em;

    private final JPAQueryFactory queryFactory;

    /**
     *
     * 6/26 -
     * 해당 방에서 요청을 보낸 사람들 목록을 받아오는 로직
     *
     */
    @Override
    public List<Member> findAllRequestByArticleId(Long articleId) {
        return queryFactory
                .select(joinRequest.member)
                .from(joinRequest)
                .join(joinRequest.member , member).fetchJoin()
                .where(joinRequest.article.id.eq(articleId) ,
                        joinRequest.joinStatus.eq(JoinStatus.WAITING))
                .fetch();
    }



    /**
     * 6/28 - 산청 후 WAITING , REJECTED 성탸인 사용자에 대한 만료 작업 ,크론탭을 이용한 자동화 작업 진행
     * @param threshold : 산청 후 WAITING , REJECTED 성탸인 사용자에 대한 만료 시간
     */

    @Override
    public void updateOverThreshold(LocalDateTime threshold) {
        long deleteCount = queryFactory
                .update(joinRequest)
                .set(joinRequest.joinStatus, JoinStatus.NON)
                .where(
                        //in 은 or 조건으로 받아지고
                        joinRequest.joinStatus.in(JoinStatus.WAITING , JoinStatus.REJECTED) ,
                        //before 은 and 조건으로 받아진다
                        joinRequest.localDateTime.before(threshold)
                )
                .execute();
        em.flush();
        em.clear();
    }

    @Override
    public Member findByMemberId(Long memberId) {
        return queryFactory
                .selectFrom(member)
                .where(member.id.eq(memberId))
                .fetchOne();
    }
}
