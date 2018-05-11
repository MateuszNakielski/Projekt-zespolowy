package pl.nakiel.projektZespolowy.service.admin;

import org.springframework.security.access.prepost.PreAuthorize;
import pl.nakiel.projektZespolowy.domain.security.Role;
import pl.nakiel.projektZespolowy.domain.security.User;
import pl.nakiel.projektZespolowy.resources.dto.createstandarduser.CreateStandardUserRequestDTO;
import pl.nakiel.projektZespolowy.resources.dto.initfacebookuser.InitFacebookUserRequestDTO;

import java.util.List;

public interface IUserService {
    List<User> getAllUsers();

    List<User> getUsersByRole(String role);

    void changePassword(String oldPassword, String newPassword);

    User createStandardUser(String username, String password, String email, String firstName, String secondName) throws Exception;

    User getUserById(Long id);

    User initFacebookUser(InitFacebookUserRequestDTO initFacebookUserRequestDTO);


    Boolean hasRole(User user, String role);

    Boolean hasRole(User user, Role role);
}
