package reforged.marcin.krysiak.basketstats.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Arrays;

@Getter
@Setter
@Entity
@Table(name = "teams")
@NoArgsConstructor
@AllArgsConstructor
public class Team {

    @Id
    @SequenceGenerator(allocationSize = 1, name = "teams_id_seq", sequenceName = "teams_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "teams_id_seq")
    private Long id;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(name = "logo")
    private String imageName;

    @Basic(fetch = FetchType.LAZY)
    @Column(name = "data")
    private byte[] imageFile;

    @Column(length = 100)
    private String type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "league_id", nullable = false)
    private League league;

    public Team(Long id, String name, String imageName, League league) {
        this.id = id;
        this.name = name;
        this.imageName = imageName;
        this.league = league;
    }
    @Override
    public String toString() {
        return "Team{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", logo='" + imageName + '\'' +
                ", data=" + Arrays.toString(imageFile) +
                ", type='" + type + '\'' +
                ", league=" + league +
                '}';
    }
}
