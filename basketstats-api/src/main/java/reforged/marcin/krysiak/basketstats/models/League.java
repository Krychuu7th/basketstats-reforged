package reforged.marcin.krysiak.basketstats.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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

}
