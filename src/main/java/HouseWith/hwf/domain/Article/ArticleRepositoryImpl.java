package HouseWith.hwf.domain.Article;

import HouseWith.hwf.DTO.*;
import HouseWith.hwf.domain.JoinRequest.Custom.JoinStatus;
import HouseWith.hwf.domain.JoinRequest.JoinRequest;
import HouseWith.hwf.domain.JoinRequest.QJoinRequest;
import HouseWith.hwf.domain.Member.Member;
import com.querydsl.core.group.GroupBy;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static HouseWith.hwf.domain.Article.QArticle.article;
import static HouseWith.hwf.domain.JoinRequest.QJoinRequest.joinRequest;
import static HouseWith.hwf.domain.Keywords.QRoomKeyword.roomKeyword;
import static HouseWith.hwf.domain.Member.QMember.member;
import static com.querydsl.core.types.Projections.list;

@RequiredArgsConstructor
public class ArticleRepositoryImpl implements ArticleRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    /**
     * 전체 게시물 찾기
     * 25/6/23 - 업로드 시간 별로 저장 , 1 페이지 당 12 게시물
     */

    @Override
    public List<ArticleDTO> findArticles() {
        return queryFactory
                .select(new QArticleDTO(
                        article.owner_nickname,
                        article.owner ,
                        article.createdTime ,
                        article.dormitory ,
                        article.title ,
                        article.quarter ,
                        article.join_member_count ,
                        article.access_max ,
                        article.comment ,
                        article.open_url))
                .from(article)
                .orderBy(article.createdTime.desc())
                .offset(0)
                .limit(12)
                .fetch();
    }

    /**
     * 6/26 -
     * article_Id 로 게시글 검색
     *
     * 7/8 - 수장
     * articleId로 해당 방의 정보들 전체 반환
     * 방에 속한 member 들 전부 반환
     */
    @Override
    public Optional<DormitoryDTO> findArticleByAcceptedMember(Long articleId) {
        Map<Long , DormitoryDTO> result = queryFactory
                .from(article)
                .leftJoin(article.joinRequests , joinRequest)
                .leftJoin(joinRequest.member , member)
                .on(joinRequest.joinStatus.in(JoinStatus.ACCEPTED , JoinStatus.OWNER))
                .where(article.id.eq(articleId))
                .transform(GroupBy.groupBy(article.id).as(
                        Projections.constructor(DormitoryDTO.class ,
                                article.id ,
                                article.createdTime ,
                                article.dormitory ,
                                article.title ,
                                article.quarter ,
                                article.join_member_count ,
                                article.access_max ,
                                article.comment ,
                                article.open_url ,
                                list(
                                        Projections.constructor(MemberDTO.class ,
                                                member.id ,
                                                joinRequest.joinStatus ,
                                                member.name ,
                                                member.phone ,
                                                member.email ,
                                                member.nickname ,
                                                member.sex ,
                                                member.dormitoryName).skipNulls()
                                ))
                ));

        DormitoryDTO dto = result.get(articleId);

        if (dto == null) return Optional.empty();
        else return Optional.of(dto);
    }

    /**
     *
     * title_param -> 검색 키워드
     * 6/23 -
     * 검색 기능 추가 -> 비슷한 단어/키워드 검색
     * 페이징 기능 추가로 한 화면당 10개 -> 수정 가능
     * 인원 수 , 룸메이트 생활조건(중복)
     *
     */
    @Override
    public List<ArticleDTO> findArticleByKeywords(String search_key , String motion , String smoke , String sleep_time , String available_at , String dormitory) {
        return queryFactory
                .select(new QArticleDTO(
                        article.owner_nickname ,
                        article.owner ,
                        article.createdTime ,
                        article.dormitory ,
                        article.title ,
                        article.quarter ,
                        article.join_member_count ,
                        article.access_max ,
                        article.comment ,
                        article.open_url))
                .from(article)
                .join(article.roomKeyword , roomKeyword)
                .where(
                        search_keyEq_title(search_key) ,
                        search_keyEq_comment(search_key) ,
                        motionEq(motion) ,
                        smokeEq(smoke) ,
                        sleep_timeEq(sleep_time) ,
                        available_atEq(available_at) ,
                        dormitoryEq(dormitory)
                        )
                .fetch();
    }


    /**
     * 6/25 -
     * 검색 키워드 추가 - 검색창
     */
    private BooleanExpression search_keyEq_title(String search_key){
        return search_key == null ? article.title.like("%"+search_key+"%") : null;
    }

    private BooleanExpression search_keyEq_comment(String search_key){
        return search_key == null ? article.comment.like("%"+search_key+"%") : null;
    }

    private BooleanExpression search_dormitoryEq(String dormitory){
        return dormitory == null ? article.dormitory.like("%"+dormitory+"%") : null;
    }

    /**
     * 6/25 -
     * 검색 조건 키워드 추가 - 버튼
     */

    private BooleanExpression motionEq(String motion) {
        return motion != null ? roomKeyword.motion.eq(motion) : null;
    }

    private BooleanExpression smokeEq(String smoke) {
        return smoke != null ? roomKeyword.smoke.eq(smoke) : null;
    }

    private BooleanExpression sleep_timeEq(String sleep_time) {
        return sleep_time != null ? roomKeyword.sleep_time.eq(sleep_time) : null;
    }

    private BooleanExpression available_atEq(String available_eat) {
        return available_eat != null ? roomKeyword.available_eat.eq(available_eat) : null;
    }

    private BooleanExpression dormitoryEq(String dormitory) {
        return dormitory != null ? article.dormitory.eq(dormitory) : null;
    }

    public Article findArticlesById(Long articleId) {
        return queryFactory
                .selectFrom(article)
                .where(article.id.eq(articleId))
                .fetchOne();
    }


    /**
     * @param articleId : 방 id
     * @param memberId : 멤버 id
     * @return : 권한 반환
     */
    @Override
    public JoinStatus findJoinStatus(Long articleId , Long memberId) {
        return queryFactory
                .select(joinRequest.joinStatus)
                .from(joinRequest)
                .join(joinRequest.member , member)
                .join(joinRequest.article , article)
                .where(article.id.eq(articleId) ,
                        member.id.eq(memberId))
                .fetchOne();
    }

    public Long countArticlesByMember(Long memberId) {
        Long cnt = queryFactory
                .select(joinRequest.article.countDistinct())
                .from(joinRequest)
                .join(joinRequest.member , member)
                .where(joinRequest.member.id.eq(memberId) ,
                        joinRequest.joinStatus.eq(JoinStatus.OWNER))
                .fetchOne();
        return cnt == null ? 0L : cnt;
    }

    /**
     *
     * 6/26 -
     * 관리자 페이지 용 데이터 정보창
     * 날짜 별 생성된 방 갯수 + 성사된 매칭 수 + (가입 유저 수는 나중에 개발하는걸로)
     *
     */

    @Override
    public List<ArticleDTO> findArticleByTime_Admin(LocalDate localDate) {
        return queryFactory
                .select(new QArticleDTO(
                        article.owner_nickname ,
                        article.owner ,
                        article.createdTime ,
                        article.dormitory ,
                        article.title ,
                        article.quarter ,
                        article.join_member_count ,
                        article.access_max ,
                        article.comment ,
                        article.open_url))
                .from(article)
                .where(article.createdTime.year().eq(localDate.getYear())
                        .and(article.createdTime.month().eq(localDate.getMonthValue()))
                        .and(article.createdTime.dayOfMonth().eq(localDate.getDayOfMonth())))
                .fetch();
    }
}
