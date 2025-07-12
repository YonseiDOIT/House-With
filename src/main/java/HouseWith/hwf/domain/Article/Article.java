package HouseWith.hwf.domain.Article;

import HouseWith.hwf.DTO.ArticleDTO;
import HouseWith.hwf.DTO.RoomKeywordDTO;
import HouseWith.hwf.domain.JoinRequest.JoinRequest;
import HouseWith.hwf.domain.Keywords.RoomKeyword;
import HouseWith.hwf.domain.Member.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Article {
    //id
    @Id @GeneratedValue
    @Column(name = "article_id")
    private Long id;
    //소유자
    private Long owner;
    //글 생성 시점 업데이트
    private LocalDateTime createdTime;
    //기숙사 이름
    private String dormitory;
    //제목
    private String title;
    //학기
    private String quarter;
    //키워드
    @OneToOne(
            mappedBy = "article" ,
            orphanRemoval = true
    )
    private RoomKeyword roomKeyword;

    //현재 인원 수
    private Integer join_member_count;
    //최대 인원 수
    private Integer access_max;
    //한줄 소개
    private String comment;
    //오픈 채팅방
    private String open_url;

    @OneToMany(
            mappedBy = "article" ,
            orphanRemoval = true
    )
    private List<JoinRequest> joinRequests = new ArrayList<>();

    public Article(Long owner ,
                   String dormitory,
                   String title,
                   String quarter,
                   Integer join_member_count ,
                   Integer access_max ,
                   String comment ,
                   String open_url) {
        this.owner = owner;
        this.createdTime = LocalDateTime.now();
        this.dormitory = dormitory;
        this.title = title;
        this.quarter = quarter;
        this.join_member_count = join_member_count;
        this.access_max = access_max;
        this.comment = comment;
        this.open_url = open_url;
    }

    public void set_owner(Long owner) {
        this.owner = owner;
    }

    public void add_JoinMember_count(int memberCount) {
        this.join_member_count = memberCount + 1;
    }

    public void delete_JoinMember_count(int memberCount) {
        this.join_member_count = memberCount - 1;
    }

    public void set_roomKeyword(RoomKeyword keyword) {
        this.roomKeyword = keyword;
    }

    public void set_joinRequest(JoinRequest request) {
        joinRequests.add(request);
        request.set_Article(this);
    }

    //DTO로 부터 영속성 컨텍스트 업데이트
    public void update_detail(ArticleDTO detail) {
        this.createdTime = detail.getCreatedTime();
        this.owner = detail.getOwner();
        this.dormitory = detail.getDormitory();
        this.title = detail.getTitle();
        this.quarter = detail.getQuarter();
        this.join_member_count = detail.getJoin_member_count();
        this.access_max = detail.getAccess_max();
        this.comment = detail.getComment();
        this.open_url = detail.getOpen_url();
    }
}
