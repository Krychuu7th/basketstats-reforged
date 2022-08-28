package pwsz.marcin.krysiak.basketstats.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pwsz.marcin.krysiak.basketstats.models.Role;
import pwsz.marcin.krysiak.basketstats.repositories.RoleRepository;
import pwsz.marcin.krysiak.basketstats.service.RoleService;

import java.util.List;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
}
