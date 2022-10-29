package reforged.marcin.krysiak.basketstats.repositories.custom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import reforged.marcin.krysiak.basketstats.dto.MatchStatsDTO;
import reforged.marcin.krysiak.basketstats.repositories.TeamRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Repository
public class MatchStatsRepositoryCustomImpl implements MatchStatsRepositoryCustom {

    @Autowired
    private TeamRepository teamRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<MatchStatsDTO> getMatchStats(Long matchId) throws Exception {
        String getAllAvgStatsOfTeamPlayersQuery =
                """
                        SELECT team_id, SUM(ptsa) AS pts, SUM(pm2a) AS pm2, SUM(pa2a) AS pa2, SUM(pm3a) AS pm3,
                           	SUM(pa3a) AS pa3, SUM(ftma) AS ftm, SUM(ftaa) AS fta, SUM(asta) AS ast,
                        	SUM(blkma) AS blkm, SUM(blkga) AS blkg, SUM(offra) AS offr, SUM(defra)  AS defr,
                        	SUM(tova) AS tov, SUM(stla) AS stl, SUM(pfa) AS pf, SUM(fda) AS fd
                        FROM (
                        	SELECT ps.player_id as player_id, mq.match_id, t.id as team_id,
                        			SUM(ps.pts) AS ptsa,  SUM(ps.pm2) AS pm2a, SUM(ps.pa2) AS pa2a, SUM(ps.pm3) AS pm3a, SUM(ps.pa3) AS pa3a, SUM(ps.ftm) AS ftma, SUM(ps.fta) AS ftaa, SUM(ps.ast) AS asta,
                        			SUM(ps.blkm) AS blkma, SUM(ps.blkg) AS blkga, SUM(ps.offr) AS offra, SUM(ps.defr) AS defra, SUM(ps.tov) AS tova, SUM(ps.stl) AS stla, SUM(ps.pf) AS pfa, SUM(ps.fd) AS fda
                        		FROM players_stats ps
                        		INNER JOIN matches_stats ms ON ms.player_stats_id = ps.id
                        			INNER JOIN matches_quarters mq ON ms.match_quarter_id = mq.id
                        		INNER JOIN players p ON ps.player_id = p.id
                        			INNER JOIN teams t ON p.team_id = t.id
                        				INNER JOIN leagues l ON t.league_id = l.id
                        	WHERE mq.match_id = :matchId
                        	GROUP BY ps.player_id, mq.match_id, t.id
                        ) as player_stats_sum
                        GROUP BY player_stats_sum.team_id
                        ORDER BY team_id ASC""";
        Query query = entityManager.createNativeQuery(getAllAvgStatsOfTeamPlayersQuery).setParameter("matchId", matchId);

        List<Object[]> res = (List<Object[]>) query.getResultList();
        List<MatchStatsDTO> matchStatsDTOList = new ArrayList<>();
        for (Object[] obj : res) {
            MatchStatsDTO dto = new MatchStatsDTO(obj, teamRepository);
            matchStatsDTOList.add(dto);
        }
        return matchStatsDTOList;
    }
}
