package reforged.marcin.krysiak.basketstats.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "roles")
public class Role {

    @Id
    @SequenceGenerator(allocationSize = 1, name = "roles_id_seq", sequenceName = "roles_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "roles_id_seq")
    private Long id;

    @Column(name = "name", length = 50, nullable = false)
    private String name;

    public Role() {
    }

    @Override
    public String toString() {
        return "Role{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
