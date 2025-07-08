package HouseWith.hwf.domain.Article;

import HouseWith.hwf.DTO.ArticleDTO;
import HouseWith.hwf.DTO.RoomKeywordDTO;
import HouseWith.hwf.domain.JoinRequest.JoinRequest;
import HouseWith.hwf.domain.Keywords.RoomKeyword;
import HouseWith.hwf.domain.Member.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
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
    //글 생성 시점 업데이트
    private LocalDateTime createdTime;
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

    //최대 인원 수
    private Integer access_max;

    private String comment;
    private String open_url;

    @OneToMany(
            mappedBy = "article" ,
            orphanRemoval = true
    )
    private List<JoinRequest> joinRequests = new ArrayList<>();



    public Article(
            Long articleId ,
            LocalDateTime createdTime,
            String dormitory,
            String title,
            String quarter,
            Integer access_max,
            String comment,
            String open_url) {
        this.id = articleId;
        this.createdTime = createdTime;
        this.dormitory = dormitory;
        this.title = title;
        this.quarter = quarter;
        this.access_max = access_max;
        this.comment = comment;
        this.open_url = open_url;
    }

    public Article(
            LocalDateTime createdTime,
            String dormitory,
            String title,
            String quarter,
            Integer access_max,
            String comment,
            String open_url) {
        this.createdTime = createdTime;
        this.dormitory = dormitory;
        this.title = title;
        this.quarter = quarter;
        this.access_max = access_max;
        this.comment = comment;
        this.open_url = open_url;
    }

    public Article(
            LocalDateTime createdTime ,
            String dormitory ,
            String quarter ,
            RoomKeyword roomKeyword ,
            Integer access_max ,
            String comment ,
            String open_url ,
            JoinRequest joinRequest
    ) {
        this.createdTime = createdTime;
        this.dormitory = dormitory;
        this.quarter = quarter;
        this.access_max = access_max;
        this.comment = comment;
        this.open_url = open_url;
        this.roomKeyword = roomKeyword;
        this.joinRequests.add(joinRequest);
    }

    public void set_roomKeyword(RoomKeyword keyword) {
        this.roomKeyword = keyword;
    }

    public void set_joinRequest(JoinRequest request) {
        joinRequests.add(request);
        request.set_Article(this);
    }
}
