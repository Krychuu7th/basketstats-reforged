package pwsz.marcin.krysiak.basketstats.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
@Entity
@SequenceGenerator(name="seq", initialValue=10)
@Table(name = "leagues")
public class League {

    @Id
    @SequenceGenerator(allocationSize = 1, name = "leagues_id_seq", sequenceName = "leagues_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Long id;

    @Column(length = 50, nullable = false)
    private String name;

    public League() {

    }

    public League(Long id, String name, Set<Team> teams) {
        this.id = id;
        this.name = name;
    }

}
