package HouseWith.hwf.DTO;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class DormitoryDTO {
    //글 Id
    private Long articleId;
    //시간
    private LocalDateTime createdTime;
    //기숙사 정보
    private String dormitory;
    //제목
    private String title;
    //학기
    private String quarter;

    private Integer access_max;

    private String comment;
    private String open_url;

    private List<MemberDTO> memberDTO;

    @QueryProjection
    public DormitoryDTO(
            Long articleId ,
            LocalDateTime createdTime ,
            String dormitory ,
            String title ,
            String quarter ,
            Integer access_max ,
            String comment ,
            String open_url ,
            List<MemberDTO> memberDTO
    ) {
        this.articleId = articleId;
        this.createdTime = createdTime;
        this.dormitory = dormitory;
        this.title = title;
        this.quarter = quarter;
        this.access_max = access_max;
        this.comment = comment;
        this.open_url = open_url;
        this.memberDTO = memberDTO;
    }

}
