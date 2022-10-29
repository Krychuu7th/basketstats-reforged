package reforged.marcin.krysiak.basketstats.repositories;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import reforged.marcin.krysiak.basketstats.models.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
//    Optional<User> findByRoles(List<Role> roles);
    List<User> findAllByEnabledTrue(Sort sort);
}
