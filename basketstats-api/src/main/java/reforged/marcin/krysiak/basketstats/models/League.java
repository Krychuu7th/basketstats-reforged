package reforged.marcin.krysiak.basketstats.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import reforged.marcin.krysiak.basketstats.models.base.AuditEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "leagues")
public class League extends AuditEntity {

    @Id
    @SequenceGenerator(allocationSize = 1, name = "leagues_id_seq", sequenceName = "leagues_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "leagues_id_seq")
    private Long id;

    @Column(length = 50, nullable = false)
    private String name;

}
