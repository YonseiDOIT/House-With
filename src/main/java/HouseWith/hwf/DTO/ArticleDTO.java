package HouseWith.hwf.DTO;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ArticleDTO {
    //소유자 닉네임
    private String owner_nickname;
    //소유자 ID
    private Long owner;
    //시간
    private LocalDateTime createdTime;
    //기숙사 정보
    private String dormitory;
    //제목
    private String title;
    //학기
    private String quarter;

    private Integer join_member_count;

    private Integer access_max;

    private String comment;

    private String open_url;


    @QueryProjection
    public ArticleDTO(String owner_nickname ,
                      Long owner,
                      LocalDateTime createdTime ,
                      String dormitory ,
                      String title ,
                      String quarter ,
                      Integer join_member_count ,
                      Integer access_max ,
                      String comment ,
                      String open_url) {
        this.owner_nickname = owner_nickname;
        this.owner = owner;
        this.createdTime = createdTime;
        this.dormitory = dormitory;
        this.title = title;
        this.quarter = quarter;
        this.join_member_count = join_member_count;
        this.access_max = access_max;
        this.comment = comment;
        this.open_url = open_url;
    }

}
