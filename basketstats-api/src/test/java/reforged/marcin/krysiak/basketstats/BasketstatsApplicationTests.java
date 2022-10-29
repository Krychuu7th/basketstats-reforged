package reforged.marcin.krysiak.basketstats;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import reforged.marcin.krysiak.basketstats.models.League;
import reforged.marcin.krysiak.basketstats.models.Player;
import reforged.marcin.krysiak.basketstats.models.Team;
import reforged.marcin.krysiak.basketstats.repositories.LeagueRepository;
import reforged.marcin.krysiak.basketstats.repositories.TeamRepository;
import reforged.marcin.krysiak.basketstats.service.PlayerService;
import reforged.marcin.krysiak.basketstats.service.TeamService;
import reforged.marcin.krysiak.basketstats.service.impl.TeamServiceImpl;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class BasketstatsApplicationTests {
//
//	@Autowired
//	private TeamService teamService;
//
//	@Autowired
//	private TeamRepository teamRepository;
//
//	@Autowired
//	private LeagueRepository leagueRepository;
//
//	@Autowired
//	private PlayerService playerService;
//
//	@TestConfiguration
//	static class TeamServiceImplTestContextConfiguration {
//
//		@Bean
//		public TeamService teamService() {
//			return new TeamServiceImpl();
//		}
//	}
//
//	@Test
//	public void whenValidName_thenTeamShouldBeFound() {
//		String teamName = "Raptors";
//		Team found = teamService.getTeamByName(teamName);
//
//		assertThat(found.getName())
//				.isEqualTo(teamName);
//	}
//
//	@Test
//	public void whenInValidName_thenTeamShouldNotBeFound() {
//		String teamName = "invalid_team_name";
//		Team found = teamService.getTeamByName(teamName);
//
//		assertThat(found)
//				.isNull();
//	}
//
//	@Test
//	public void whenValidName_thenTeamListShouldOnlyContainTeamOfLeagueWithGivenName() {
//		League existingLeague = leagueRepository.findByName("Ekstraliga").orElse(null);
//		List<Team> foundTeams = teamService.getAllTeamsByLeague(existingLeague.getId());
//		List<String> leagueNamesOfTeams = new ArrayList<>();
//		for (Team foundTeam: foundTeams) {
//			leagueNamesOfTeams.add(foundTeam.getLeague().getName());
//		}
//		assertThat(leagueNamesOfTeams)
//				.containsOnly(existingLeague.getName());
//	}
//
//	@Test
//	public void whenValidId_thenPlayerListShouldOnlyContainPlayersWithGivenTeamId() {
//		Team existingTeam = teamRepository.findById(1L).orElse(null);
//		List<Player> foundPlayers = playerService.getAllPlayersByTeamId(existingTeam.getId());
//		List<Long> teamIdsOfPlayers = new ArrayList<>();
//		for(Player foundPlayer: foundPlayers) {
//			teamIdsOfPlayers.add(foundPlayer.getTeam().getId());
//		}
//		assertThat(teamIdsOfPlayers)
//				.containsOnly(existingTeam.getId());
//	}

}
