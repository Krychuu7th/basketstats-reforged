package reforged.marcin.krysiak.basketstats.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import reforged.marcin.krysiak.basketstats.models.Match;

import java.util.List;

public interface MatchRepository extends JpaRepository<Match, Long> {

    @Query("SELECT m FROM Match m WHERE m.teamA.id = :teamId OR m.teamB.id = :teamId")
    List<Match> findMatchesByTeamId(@Param("teamId") Long id);

    @Query("SELECT m FROM Match m WHERE m.teamA.league.id = :leagueId")
    List<Match> findMatchesByLeagueId(@Param("leagueId") Long id);

    @Query("SELECT m FROM Match m WHERE m.teamA.league.id = :leagueId AND m.user.id = :userId")
    List<Match> findMatchesByLeagueIdAndUserId(@Param("leagueId") Long leagueId, @Param("userId") Long userId);

}
