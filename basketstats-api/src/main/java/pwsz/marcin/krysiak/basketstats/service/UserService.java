package pwsz.marcin.krysiak.basketstats.service;

import pwsz.marcin.krysiak.basketstats.models.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();
    List<User> getAllActiveUsers();
    Optional<User> getUserByUsername(String username);
    Optional<User> getUserByEmail(String email);
    User createUser(User user);
    void activeUser(Long id) throws Exception;
    void updateUser(User user, Long id);
    void deleteUserById(Long id);
}
