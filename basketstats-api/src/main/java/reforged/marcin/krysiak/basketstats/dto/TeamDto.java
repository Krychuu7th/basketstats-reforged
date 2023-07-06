package reforged.marcin.krysiak.basketstats.dto;

import lombok.Data;

@Data
public class TeamDto {
    private Long id;
    private String name;
    private String imageName;
    private String type;
    private LeagueDto league;

}
