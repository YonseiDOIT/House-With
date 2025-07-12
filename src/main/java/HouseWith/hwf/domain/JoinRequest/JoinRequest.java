package HouseWith.hwf.domain.JoinRequest;

import HouseWith.hwf.domain.Article.Article;
import HouseWith.hwf.domain.JoinRequest.Custom.JoinStatus;
import HouseWith.hwf.domain.Member.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
/**
 * JoinStatus 의 필요성
 * 한 사람당 가입 신청 가능한 방의 갯수가 3개까지 (본인 방 까지 합쳐서)
 */
public class JoinRequest {
    @Id @GeneratedValue
    @Column(name = "roomjoin_id")
    private Long id;

    private LocalDateTime localDateTime;

    @Enumerated(EnumType.STRING)
    private JoinStatus joinStatus;


    @ManyToOne(
            fetch = FetchType.LAZY
    )
    private Article article;

    @ManyToOne(
            fetch = FetchType.LAZY
    )
    private Member member;

    public JoinRequest(LocalDateTime localDateTime,
                       JoinStatus joinStatus) {
        this.localDateTime = localDateTime;
        this.joinStatus = joinStatus;
    }

    public JoinRequest(Article article , Member member , JoinStatus joinStatus){
        this.article = article;
        this.member = member;
        this.joinStatus = joinStatus;
        this.localDateTime = LocalDateTime.now();
    }

    public void join_accept() {
        this.joinStatus = JoinStatus.ACCEPTED;
    }

    public void join_reject() {
        this.joinStatus = JoinStatus.REJECTED;
    }

    public void set_Article(Article article){
        this.article = article;
    }

    public void set_Member(Member member) {this.member = member;}

}
