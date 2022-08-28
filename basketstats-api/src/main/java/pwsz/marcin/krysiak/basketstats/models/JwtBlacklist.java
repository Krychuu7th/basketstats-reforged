package pwsz.marcin.krysiak.basketstats.models;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Setter
@Getter
@Entity
@SequenceGenerator(name="seq", initialValue=10)
@Table(name = "jwt_blacklist")
public class JwtBlacklist {

    @Id
    @SequenceGenerator(allocationSize = 1, name = "jwt_blacklist_id_seq", sequenceName = "jwt_blacklist_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Type(type = "text")
    private String token;

    private Long expirationDate;


    public JwtBlacklist() {
    }

    public JwtBlacklist(String token, Long expirationDate) {
        this.token = token;
        this.expirationDate = expirationDate;
    }

    @Override
    public String toString() {
        return "JwtBlacklistToken{" +
                " token=' " + token + ' ' +
                " dateExp=' " + expirationDate + ' ' +
                '}';
    }
}
