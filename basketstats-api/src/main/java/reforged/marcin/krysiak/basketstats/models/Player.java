package reforged.marcin.krysiak.basketstats.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@Entity
@Table(name = "players")
public class Player {

    @Id
    @SequenceGenerator(allocationSize = 1, name = "players_id_seq", sequenceName = "players_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
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

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "team_id", referencedColumnName = "id", nullable = false)
    private Team team;

    @Column(name = "position", length = 50)
    private String position;

    @Column(name = "captain")
    private boolean captain;

}
