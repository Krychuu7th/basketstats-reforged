package reforged.marcin.krysiak.basketstats.dto;

import lombok.Data;
import reforged.marcin.krysiak.basketstats.enums.PlayerPosition;

@Data
public class PlayerDto {
    private Long id;
    private String firstName;
    private String lastName;
    private int number;
    private TeamDto team;
    private PlayerPosition position;
    private boolean captain;

}
