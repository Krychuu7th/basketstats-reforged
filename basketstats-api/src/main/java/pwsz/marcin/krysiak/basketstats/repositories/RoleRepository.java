package pwsz.marcin.krysiak.basketstats.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pwsz.marcin.krysiak.basketstats.models.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
