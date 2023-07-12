package reforged.marcin.krysiak.basketstats.models;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import reforged.marcin.krysiak.basketstats.enums.MatchStatus;
import reforged.marcin.krysiak.basketstats.models.base.AuditEntity;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "matches")
public class Match extends AuditEntity {

    @Id
    @SequenceGenerator(allocationSize = 1, name = "matches_id_seq", sequenceName = "matches_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "matches_id_seq")
    private Long id;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "team_a_id", referencedColumnName = "id", nullable = false)
    private Team teamA;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "team_b_id", referencedColumnName = "id", nullable = false)
    private Team teamB;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime matchDate;

    private String place;

    @Enumerated(EnumType.STRING)
    private MatchStatus matchStatus;

    public Match(Team teamA, Team teamB, LocalDateTime matchDate, String place, MatchStatus matchStatus) {
        this.teamA = teamA;
        this.teamB = teamB;
        this.matchDate = matchDate;
        this.place = place;
        this.matchStatus = matchStatus;
    }
}
