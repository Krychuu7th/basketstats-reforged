package reforged.marcin.krysiak.basketstats.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import reforged.marcin.krysiak.basketstats.models.base.AuditEntity;

@Getter
@Setter
@Entity
@Table(name = "teams")
@NoArgsConstructor
@AllArgsConstructor
public class Team extends AuditEntity {

    @Id
    @SequenceGenerator(allocationSize = 1, name = "teams_id_seq", sequenceName = "teams_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "teams_id_seq")
    private Long id;

    @Column(length = 50, nullable = false)
    private String name;

    private String fileName;

    private String filePath;

    private String fileType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "league_id", nullable = false)
    private League league;
}
