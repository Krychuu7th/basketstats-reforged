package reforged.marcin.krysiak.basketstats.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.DateSerializer;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    @Id
    @SequenceGenerator(allocationSize = 1, name = "users_id_seq", sequenceName = "users_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Pattern(regexp = "[a-zA-Z0-9]*")
    @Column(name = "username", length = 50, nullable = false)
    private String username;

    @Column(name = "password", length = 255)
    private String password;

    @Pattern(regexp = "[a-zA-Z0-9\\@\\-\\_\\.]*")
    private String email;

    @Pattern(regexp = "[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\\-\\s]*")
    @Column(name = "first_name", length = 50)
    private String firstName;

    @Pattern(regexp = "[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\\-\\s]*")
    @Column(name = "last_name", length = 50)
    private String lastName;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonSerialize(using = DateSerializer.class)
    @Column(name = "create_date")
    private Date createDate;

    @Column(name = "enabled", columnDefinition = "boolean default true")
    private boolean enabled = false;

    @ManyToMany
    @JsonIgnoreProperties("users")
    @JoinTable(name = "users_roles",
            joinColumns = {@JoinColumn(name = "users_id")},
            inverseJoinColumns = {@JoinColumn(name = "roles_id")})
    private List<Role> roles;

    public User() {

    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", createDate=" + createDate +
                ", enabled=" + enabled +
                ", roles=" + roles +
                '}';
    }
}
