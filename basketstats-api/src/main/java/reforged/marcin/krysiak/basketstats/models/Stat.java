package reforged.marcin.krysiak.basketstats.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import reforged.marcin.krysiak.basketstats.enums.StatType;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "stats")
@NoArgsConstructor
@AllArgsConstructor
public class Stat {

    @Id
    @SequenceGenerator(allocationSize = 1, name = "stats_id_seq", sequenceName = "stats_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stats_id_seq")
    private Long id;
    @Enumerated(EnumType.STRING)
    private StatType type;
    private LocalDateTime timestamp;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_id", nullable = false)
    private Player player;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "match_quarter_id", nullable = false)
    private MatchQuarter matchQuarter;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "match_id", nullable = false)
    private Match match;

}
