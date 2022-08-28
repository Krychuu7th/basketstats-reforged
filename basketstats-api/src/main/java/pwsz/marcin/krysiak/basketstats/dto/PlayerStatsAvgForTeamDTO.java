package pwsz.marcin.krysiak.basketstats.dto;

import lombok.Getter;
import lombok.Setter;
import pwsz.marcin.krysiak.basketstats.exceptions.TeamNotFoundException;
import pwsz.marcin.krysiak.basketstats.models.Player;
import pwsz.marcin.krysiak.basketstats.repositories.PlayerRepository;

import java.math.BigDecimal;
import java.math.BigInteger;

@Getter
@Setter
public class PlayerStatsAvgForTeamDTO {

    private Player player;

    private Long id;

    private Double ptsa;

    private Double pm2a;

    private Double pa2a;

    private Double pm3a;

    private Double pa3a;

    private Double ftma;

    private Double ftaa;

    private Double asta;

    private Double blkma;

    private Double blkga;

    private Double offra;

    private Double defra;

    private Double tova;

    private Double stla;

    private Double pfa;

    private Double fda;

    public PlayerStatsAvgForTeamDTO(Object[] objects, PlayerRepository playerRepository) throws Exception {

        this.player = playerRepository.findById(((BigInteger) objects[0]).longValue())
                .orElseThrow(TeamNotFoundException::new);
        this.id = ((BigInteger) objects[0]).longValue();
        this.ptsa   = objects[1] != null ? ((BigDecimal) objects[1]).doubleValue() : 0;
        this.pm2a   = objects[2] != null ? ((BigDecimal) objects[2]).doubleValue() : 0;
        this.pa2a   = objects[3] != null ? ((BigDecimal) objects[3]).doubleValue() : 0;
        this.pm3a   = objects[4] != null ? ((BigDecimal) objects[4]).doubleValue() : 0;
        this.pa3a   = objects[5] != null ? ((BigDecimal) objects[5]).doubleValue() : 0;
        this.ftma   = objects[6] != null ? ((BigDecimal) objects[6]).doubleValue() : 0;
        this.ftaa   = objects[7] != null ? ((BigDecimal) objects[7]).doubleValue() : 0;
        this.asta   = objects[8] != null ? ((BigDecimal) objects[8]).doubleValue() : 0;
        this.blkma  = objects[9] != null ? ((BigDecimal) objects[9]).doubleValue() : 0;
        this.blkga  = objects[10] != null ? ((BigDecimal) objects[10]).doubleValue() : 0;
        this.offra  = objects[11] != null ? ((BigDecimal) objects[11]).doubleValue() : 0;
        this.defra  = objects[12] != null ? ((BigDecimal) objects[12]).doubleValue() : 0;
        this.tova   = objects[13] != null ? ((BigDecimal) objects[13]).doubleValue() : 0;
        this.stla   = objects[14] != null ? ((BigDecimal) objects[14]).doubleValue() : 0;
        this.pfa    = objects[15] != null ? ((BigDecimal) objects[15]).doubleValue() : 0;
        this.fda    = objects[16] != null ? ((BigDecimal) objects[16]).doubleValue() : 0;
    }

    @Override
    public String toString() {
        return "PlayerStatsAvgForTeamDTO{" +
                "playerId=" + id +
                ", ptsa=" + ptsa +
                ", pm2a=" + pm2a +
                ", pa2a=" + pa2a +
                ", pm3a=" + pm3a +
                ", pa3a=" + pa3a +
                ", ftma=" + ftma +
                ", ftaa=" + ftaa +
                ", asta=" + asta +
                ", blkma=" + blkma +
                ", blkga=" + blkga +
                ", offra=" + offra +
                ", defra=" + defra +
                ", tova=" + tova +
                ", stla=" + stla +
                ", pfa=" + pfa +
                ", fda=" + fda +
                '}';
    }
}
