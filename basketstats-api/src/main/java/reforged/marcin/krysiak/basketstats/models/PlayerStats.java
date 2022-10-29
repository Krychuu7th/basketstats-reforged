package reforged.marcin.krysiak.basketstats.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "players_stats")
public class PlayerStats {

    @Id
    @SequenceGenerator(allocationSize = 1, name = "players_stats_id_seq", sequenceName = "players_stats_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Long id;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "player_id", referencedColumnName = "id", nullable = false)
    private Player player;

    @Column(name = "pts")
    private int pts;

    @Column(name = "pm2")
    private int pm2;

    @Column(name = "pa2")
    private int pa2;

    @Column(name = "pm3")
    private int pm3;

    @Column(name = "pa3")
    private int pa3;

    @Column(name = "ftm")
    private int ftm;

    @Column(name = "fta")
    private int fta;

    @Column(name = "ast")
    private int ast;

    @Column(name = "blkm")
    private int blkm;

    @Column(name = "blkg")
    private int blkg;

    @Column(name = "offr")
    private int offr;

    @Column(name = "defr")
    private int defr;

    @Column(name = "tov")
    private int tov;

    @Column(name = "stl")
    private int stl;

    @Column(name = "pf")
    private int pf;

    @Column(name = "fd")
    private int fd;

    @Column(name = "eff")
    private int eff;

    @ManyToMany(mappedBy = "playersStats", cascade = CascadeType.MERGE)
    private List<MatchQuarter> matchQuarters;

//    @ManyToMany
//    @JsonIgnore
//    @JoinTable(name = "matches_stats",
//            joinColumns = {@JoinColumn(name = "player_stats_id")},
//            inverseJoinColumns = {@JoinColumn(name = "match_quarter_id")})
//    List<MatchQuarter> matchQuarters;

    @Override
    public String toString() {
        return "PlayerStats{" +
                "id=" + id +
                ", player=" + player +
                ", pts=" + pts +
                ", pm2=" + pm2 +
                ", pa2=" + pa2 +
                ", pm3=" + pm3 +
                ", pa3=" + pa3 +
                ", ftm=" + ftm +
                ", fta=" + fta +
                ", ast=" + ast +
                ", blkm=" + blkm +
                ", blkg=" + blkg +
                ", offr=" + offr +
                ", defr=" + defr +
                ", tov=" + tov +
                ", stl=" + stl +
                ", pf=" + pf +
                ", fd=" + fd +
                ", eff=" + eff +
                ", matchQuarters=" + matchQuarters +
                '}';
    }
}

