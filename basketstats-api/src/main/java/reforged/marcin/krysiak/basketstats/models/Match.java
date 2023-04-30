package reforged.marcin.krysiak.basketstats.models;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import reforged.marcin.krysiak.basketstats.enums.MatchStatus;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "matches")
public class Match {

    @Id
    @SequenceGenerator(allocationSize = 1, name = "matches_id_seq", sequenceName = "matches_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Long id;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "team_a_id", referencedColumnName = "id", nullable = false)
    private Team teamA;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "team_b_id", referencedColumnName = "id", nullable = false)
    private Team teamB;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @Column(name = "match_date")
    private LocalDateTime matchDate;

    @Column(name = "place")
    private String place;

    @Column(name = "match_status")
    @Enumerated(EnumType.STRING)
    private MatchStatus matchStatus;

    @ManyToOne()
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Match(Team teamA, Team teamB, LocalDateTime matchDate, String place, MatchStatus matchStatus, User user) {
        this.teamA = teamA;
        this.teamB = teamB;
        this.matchDate = matchDate;
        this.place = place;
        this.matchStatus = matchStatus;
        this.user = user;
    }

    @Override
    public String toString() {
        return "Match{" +
                "id=" + id +
                ", teamA=" + teamA +
                ", teamB=" + teamB +
                ", matchDate=" + matchDate +
                ", place='" + place + '\'' +
                ", match_status=" + matchStatus +
                ", user=" + user +
                '}';
    }
}
