package reforged.marcin.krysiak.basketstats.dto;

import lombok.Getter;
import lombok.Setter;
import reforged.marcin.krysiak.basketstats.repositories.PlayerRepository;

@Getter
@Setter
public class PlayersSummaryStatsOfMatchDTO {

    private PlayerDto player;

    private Long id;

    private Integer pts;

    private Integer pm2;

    private Integer pa2;

    private Integer pm3;

    private Integer pa3;

    private Integer ftm;

    private Integer fta;

    private Integer ast;

    private Integer blkm;

    private Integer blkg;

    private Integer offr;

    private Integer defr;

    private Integer tov;

    private Integer stl;

    private Integer pf;

    private Integer fd;

    private Integer eff;

    public PlayersSummaryStatsOfMatchDTO(Object[] objects, PlayerRepository playerRepository) throws Exception {

//        this.player = playerRepository.findById(((BigInteger) objects[0]).longValue())
//                .orElseThrow(TeamNotFoundException::new);
//        this.id = ((BigInteger) objects[0]).longValue();
//        this.pts   = objects[1] != null ? (Integer) objects[1] : 0;
//        this.pm2   = objects[2] != null ? (Integer) objects[2] : 0;
//        this.pa2   = objects[3] != null ? (Integer) objects[3] : 0;
//        this.pm3   = objects[4] != null ? (Integer) objects[4] : 0;
//        this.pa3   = objects[5] != null ? (Integer) objects[5] : 0;
//        this.ftm   = objects[6] != null ? (Integer) objects[6] : 0;
//        this.fta   = objects[7] != null ? (Integer) objects[7] : 0;
//        this.ast   = objects[8] != null ? (Integer) objects[8] : 0;
//        this.blkm  = objects[9] != null ? (Integer) objects[9] : 0;
//        this.blkg  = objects[10] != null ? (Integer) objects[10] : 0;
//        this.offr  = objects[11] != null ? (Integer) objects[11] : 0;
//        this.defr  = objects[12] != null ? (Integer) objects[12] : 0;
//        this.tov   = objects[13] != null ? (Integer) objects[13] : 0;
//        this.stl   = objects[14] != null ? (Integer) objects[14] : 0;
//        this.pf    = objects[15] != null ? (Integer) objects[15] : 0;
//        this.fd    = objects[16] != null ? (Integer) objects[16] : 0;
//        this.eff = (this.pts + (this.defr + this.offr) + this.ast + this.stl + this.blkm + this.fd) -
//                (((this.pa2 - this.pm2) + (this.pa3 - this.pm3)) + (this.fta - this.ftm) + this.tov + this.blkg + this.pf);
    }

    @Override
    public String toString() {
        return "PlayersSummaryStatsOfMatchDTO{" +
                "player=" + player +
                ", playerId=" + id +
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
                '}';
    }
}
