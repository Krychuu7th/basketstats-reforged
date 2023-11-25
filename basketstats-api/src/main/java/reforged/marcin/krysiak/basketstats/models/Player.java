package reforged.marcin.krysiak.basketstats.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import reforged.marcin.krysiak.basketstats.enums.PlayerPosition;

@Getter
@Setter
@Entity
@Table(name = "players")
public class Player {

    @Id
    @SequenceGenerator(allocationSize = 1, name = "players_id_seq", sequenceName = "players_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "players_id_seq")
    @Column(name = "id")
    private Long id;

    @Pattern(regexp = "[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\\-\\s]*")
    @Column(name = "first_name", length = 50)
    private String firstName;

    @Pattern(regexp = "[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\\-\\s]*")
    @Column(name = "last_name", length = 50)
    private String lastName;

    @Column(name = "number")
    private int number;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

    @Enumerated(EnumType.STRING)
    private PlayerPosition position;

    @Column(name = "captain")
    private boolean captain;

}
