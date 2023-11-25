package reforged.marcin.krysiak.basketstats.dto;

import lombok.Data;
import reforged.marcin.krysiak.basketstats.models.MatchQuarter;

import java.util.List;

@Data
public class PlayerStatsDto {

    private Long id;
    private PlayerDto player;
    private int pts;
    private int pm2;
    private int pa2;
    private int pm3;
    private int pa3;
    private int ftm;
    private int fta;
    private int ast;
    private int blkm;
    private int blkg;
    private int offr;
    private int defr;
    private int tov;
    private int stl;
    private int pf;
    private int fd;
    private int eff;
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

