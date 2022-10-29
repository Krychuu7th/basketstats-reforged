package reforged.marcin.krysiak.basketstats.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import reforged.marcin.krysiak.basketstats.models.PlayerStats;

public interface PlayerStatsRepository extends JpaRepository<PlayerStats, Long> {

//    @Query("SELECT player_id, AVG(CAST (ptsa AS DECIMAL(10,1))) AS ptsa, AVG(CAST (pm2a AS DECIMAL(10,1))) AS pm2a, AVG(CAST (pa2a AS DECIMAL(10,1))) AS pa2a, AVG(CAST (pm3a AS DECIMAL(10,1))) AS pm3a, " +
//            " AVG(CAST (pa3a AS DECIMAL(10,1))) AS pa3a, AVG(CAST (ftma AS DECIMAL(10,1))) AS ftma, AVG(CAST (ftaa AS DECIMAL(10,1))) AS ftaa, AVG(CAST (asta AS DECIMAL(10,1))) AS asta," +
//            " AVG(CAST (blkma AS DECIMAL(10,1))) AS blkma, AVG(CAST (blkga AS DECIMAL(10,1))) AS blkga, AVG(CAST (offra AS DECIMAL(10,1))) AS offra, AVG(CAST (defra AS DECIMAL(10,1))) AS defra, " +
//            " AVG(CAST (tova AS DECIMAL(10,1))) AS tova, AVG(CAST (stla AS DECIMAL(10,1))) AS stla, AVG(CAST (pfa AS DECIMAL(10,1))) AS pfa, AVG(CAST (fda AS DECIMAL(10,1))) AS fda " +
//            " FROM (" +
//            " SELECT ps.player_id as player_id, mq.match_id, " +
//            " SUM(ps.pts) AS ptsa,  SUM(ps.pm2) AS pm2a, SUM(ps.pa2) AS pa2a, SUM(ps.pm3) AS pm3a, SUM(ps.pa3) AS pa3a, SUM(ps.ftm) AS ftma, SUM(ps.fta) AS ftaa, SUM(ps.ast) AS asta," +
//            " SUM(ps.blkm) AS blkma, SUM(ps.blkg) AS blkga, SUM(ps.offr) AS offra, SUM(ps.defr) AS defra, SUM(ps.tov) AS tova, SUM(ps.stl) AS stla, SUM(ps.pf) AS pfa, SUM(ps.fd) AS fda" +
//            " FROM players_stats ps " +
//            " INNER JOIN matches_stats ms ON ms.player_stats_id = ps.id" +
//            " INNER JOIN matches_quarters mq ON ms.match_quarter_id = mq.id " +
//            " INNER JOIN players p ON ps.player_id = p.id " +
//            " INNER JOIN teams t ON p.team_id = t.id " +
//            " INNER JOIN leagues l ON t.league_id = l.id " +
//            " WHERE t.id = :teamId" +
//            " GROUP BY ps.player_id, mq.match_id " +
//            " ) as player_stats_sum" +
//            " GROUP BY player_stats_sum.player_id" +
//            " ORDER BY player_id ASC ")
//    List<PlayerStatsAvgForTeamDTO> getAllAvgStatsOfTeamPlayers(@Param("teamId") Long teamId);

}
