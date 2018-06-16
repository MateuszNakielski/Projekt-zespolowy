package pl.nakiel.projektZespolowy.service.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.nakiel.projektZespolowy.domain.security.Role;
import pl.nakiel.projektZespolowy.domain.security.User;
import pl.nakiel.projektZespolowy.repository.RoleRepository;
import pl.nakiel.projektZespolowy.repository.UserRepository;
import pl.nakiel.projektZespolowy.resources.dto.common.UserDTO;
import pl.nakiel.projektZespolowy.resources.dto.createstandarduser.CreateStandardUserRequestDTO;
import pl.nakiel.projektZespolowy.resources.dto.initfacebookuser.InitFacebookUserRequestDTO;
import pl.nakiel.projektZespolowy.security.ISecurityService;
import pl.nakiel.projektZespolowy.security.SecurityService;
import pl.nakiel.projektZespolowy.utils.exception.UsernameExistsException;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;

@Service
@Transactional
public class UserService implements IUserService{
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ISecurityService securityService;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<User> getUsersByRole(String role) {
        return null;
    }

    @Override
    public void changePassword(String oldPassword, String newPassword) {
        User user = securityService.getCurrentUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Override
    public User createStandardUser(String username, String password, String email, String firstName, String secondName) throws UsernameExistsException {
        User user = new User();
        if(userRepository.findByUsername(username) != null)
            throw new UsernameExistsException("Istnieje użytkownik o wskazanym loginie");
        if(userRepository.findByEmail(email) != null)
            throw new UsernameExistsException("Istnieje użytkownik o wskazanym loginie");
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setEmail(email);
        user.setFirstName(firstName);
        user.setSecondName(secondName);
        user.setStatus(User.ACTIVE_STD);
        user.getRoles().add(roleRepository.findByName("STANDARD_USER"));

        user = userRepository.save(user);

        return user;
    }

    @Override
    public User getUserById(Long id){
        return userRepository.getOne(id);
    }

    @Override
    public User initFacebookUser(InitFacebookUserRequestDTO initFacebookUserRequestDTO) {
        return null;
    }

    @Override
    public Boolean hasRole(User user, Role role){
        for(Role _role : user.getRoles()){
            if(_role.equals(role))
                return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }

    @Override
    public Boolean hasRole(User user, String role) {
        Role foundRole = roleRepository.findByName(role);
        for(Role _role : user.getRoles()){
            if(_role.equals(foundRole))
                return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }

    @Override
    public void updateUser(UserDTO userDTO){
        User user = securityService.getCurrentUser();
        if(userDTO.getFirstName() != null)
            user.setFirstName(userDTO.getFirstName());
        if(userDTO.getSecondName() != null)
            user.setSecondName(userDTO.getSecondName());
        if(userDTO.getPhoneNumber() != null)
            user.setPhoneNumber(userDTO.getPhoneNumber());
        userRepository.save(user);
    }
}
