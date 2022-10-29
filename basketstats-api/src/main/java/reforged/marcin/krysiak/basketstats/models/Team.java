package reforged.marcin.krysiak.basketstats.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Arrays;

@Getter
@Setter
@Entity
@Table(name = "teams")
public class Team {

    @Id
    @SequenceGenerator(allocationSize = 1, name = "teams_id_seq", sequenceName = "teams_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Long id;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(nullable = true)
    private String logo;

    @Column(nullable = true)
    @Basic(fetch = FetchType.LAZY)
    private byte[] data;

    @Column(length = 100, nullable = true)
    private String type;

    @ManyToOne()
    @JoinColumn(name = "league_id", referencedColumnName = "id", nullable = false)
    private League league;

    public Team() {

    }

    public Team(Long id, String name, String logo, League league) {
        this.id = id;
        this.name = name;
        this.logo = logo;
        this.league = league;
    }

    public Team(Long id, String name, String logo, byte[] data, String type, League league) {
        this.id = id;
        this.name = name;
        this.logo = logo;
        this.data = data;
        this.type = type;
        this.league = league;
    }

    @Override
    public String toString() {
        return "Team{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", logo='" + logo + '\'' +
                ", data=" + Arrays.toString(data) +
                ", type='" + type + '\'' +
                ", league=" + league +
                '}';
    }
}
