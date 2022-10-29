package reforged.marcin.krysiak.basketstats.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "matches_quarters")
public class MatchQuarter {

    @Id
    @SequenceGenerator(allocationSize = 1, name = "matches_quarters_id_seq", sequenceName = "matches_quarters_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "match_id", referencedColumnName = "id", nullable = false)
    private Match match;

    @Column(name = "quarter")
    private int quarter;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JsonIgnoreProperties("matchQuarters")
    @JoinTable(name = "matches_stats",
            joinColumns = {@JoinColumn(name = "match_quarter_id")},
            inverseJoinColumns = {@JoinColumn(name = "player_stats_id")})
    private List<PlayerStats> playersStats;


    public MatchQuarter(Match match, int quarter, List<PlayerStats> playersStats) {
        this.match = match;
        this.quarter = quarter;
        this.playersStats = playersStats;
    }
}
