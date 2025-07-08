package HouseWith.hwf.domain.LivingPattern;

import HouseWith.hwf.domain.Member.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LivingPattern {
    @Id @GeneratedValue
    @Column(name = "pattern_id")
    private int id;

    @OneToOne
    private Member member;

    private String sleep_pattern;
    private String snoring;
    private String night_work;
    private String home_leaving;
    private String shower_pattern;
    private String sharing;
    private String speaker_use;
    private String call_pattern;
    private String introvert;
    private String sanitary;
    private String smoke;
    private String available_eat;

    public LivingPattern(
            String sleep_pattern ,
            String snoring ,
            String night_work ,
            String home_leaving ,
            String shower_pattern ,
            String sharing ,
            String speaker_use ,
            String call_pattern ,
            String introvert ,
            String sanitary ,
            String smoke ,
            String available_eat
    ) {
        this.sleep_pattern = sleep_pattern;
        this.snoring = snoring;
        this.night_work = night_work;
        this.home_leaving = home_leaving;
        this.shower_pattern = shower_pattern;
        this.sharing = sharing;
        this.speaker_use = speaker_use;
        this.call_pattern = call_pattern;
        this.introvert = introvert;
        this.sanitary = sanitary;
        this.smoke = smoke;
        this.available_eat = available_eat;
    }
}
