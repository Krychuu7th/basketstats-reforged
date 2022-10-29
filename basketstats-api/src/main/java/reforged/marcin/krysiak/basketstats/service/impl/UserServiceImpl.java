package reforged.marcin.krysiak.basketstats.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reforged.marcin.krysiak.basketstats.models.Role;
import reforged.marcin.krysiak.basketstats.models.User;
import reforged.marcin.krysiak.basketstats.repositories.RoleRepository;
import reforged.marcin.krysiak.basketstats.repositories.UserRepository;
import reforged.marcin.krysiak.basketstats.service.UserService;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<User> getAllUsers() {
        return this.userRepository.findAll(Sort.by(Sort.Direction.ASC, "username"));
    }

    @Override
    public List<User> getAllActiveUsers() {
        return this.userRepository.findAllByEnabledTrue(Sort.by(
                Sort.Order.asc("username"),
                Sort.Order.asc("enabled")));
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }

    @Override
    public User createUser(User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreateDate(new Date());
        user.setEnabled(true);

        List<Role> userRoles = user.getRoles();
        if(userRoles.size() == 1 && userRoles.get(0).getId() == 1) {
            Role userRole = new Role();
            userRole.setId(2L);
            userRole.setName("ROLE_USER");
            userRoles.add(userRole);
        }

        System.out.println(userRoles);

        user.setRoles(userRoles);

        return this.userRepository.save(user);
    }

    @Override
    public void updateUser(User user, Long id) {

        if (this.userRepository.findById(id).isPresent()) {

            User newUser = this.userRepository.findById(id).get();
            newUser.setUsername(user.getUsername());
            if(user.getPassword() != null)
                if (!user.getPassword().equals(""))
                    newUser.setPassword(passwordEncoder.encode(user.getPassword()));
            newUser.setEmail(user.getEmail());
            newUser.setFirstName(user.getFirstName());
            newUser.setLastName(user.getLastName());

            List<Role> userRoles = user.getRoles();
            if(userRoles.size() == 1 && userRoles.get(0).getId() == 1) {
                Role userRole = new Role();
                userRole.setId(2L);
                userRole.setName("ROLE_USER");
                userRoles.add(userRole);
            }

            newUser.setRoles(userRoles);

            this.userRepository.save(newUser);

        } else {
            throw new RuntimeException("User with id " + id + " doesn't exists");
        }

    }

    @Override
    public void activeUser(Long id) {

        if (this.userRepository.findById(id).isPresent()) {

            User newUser = this.userRepository.findById(id).get();
            newUser.setEnabled(!newUser.isEnabled());
            this.userRepository.save(newUser);

        } else {
            throw new RuntimeException("User with id " + id + " doesn't exists");
        }

    }

    @Override
    public void deleteUserById(Long id) {
        this.userRepository.deleteById(id);
    }

}
