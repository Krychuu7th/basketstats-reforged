package pwsz.marcin.krysiak.basketstats.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pwsz.marcin.krysiak.basketstats.models.MyUserDetails;
import pwsz.marcin.krysiak.basketstats.repositories.UserRepository;

@Service
@Transactional
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        MyUserDetails userDetails;

        if (userRepository.findByUsername(username).isPresent()) {
            userDetails = new MyUserDetails(userRepository.findByUsername(username).get());
        } else {
            throw new UsernameNotFoundException("UserModel not exist with name : " + username);
        }

        return userDetails;
    }
}
