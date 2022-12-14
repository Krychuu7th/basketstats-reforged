package reforged.marcin.krysiak.basketstats.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import reforged.marcin.krysiak.basketstats.models.JwtBlacklist;


@Repository
public interface JwtBlacklistRepository extends JpaRepository<JwtBlacklist, Long> {
    boolean existsByToken(String token);
    void deleteAllByExpirationDateLessThan(Long time);

}
