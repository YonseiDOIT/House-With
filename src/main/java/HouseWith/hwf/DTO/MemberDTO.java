package HouseWith.hwf.DTO;

import HouseWith.hwf.domain.JoinRequest.Custom.JoinStatus;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class MemberDTO {
    private Long Id;
    private JoinStatus MemberStatus;
    private String name;
    private String phone;
    private String email;

    private String nickname;
    private String sex;
    private String dormitoryName;

    @QueryProjection
    public MemberDTO(
            Long memberId ,
            JoinStatus memberStatus,
            String name,
            String phone,
            String email ,
            String nickname ,
            String sex ,
            String dormitoryName) {
        this.Id = memberId;
        this.MemberStatus = memberStatus;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.nickname = nickname;
        this.sex = sex;
        this.dormitoryName = dormitoryName;
    }
}
