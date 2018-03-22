package pl.nakiel.projektZespolowy.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.nakiel.projektZespolowy.domain.security.User;
import pl.nakiel.projektZespolowy.resources.dto.changepassword.ChangePasswordRequestDTO;
import pl.nakiel.projektZespolowy.resources.dto.common.UserDTO;
import pl.nakiel.projektZespolowy.resources.dto.createstandarduser.CreateStandardUserRequestDTO;
import pl.nakiel.projektZespolowy.resources.dto.createstandarduser.CreateStandardUserResponseDTO;
import pl.nakiel.projektZespolowy.resources.dto.editcurrentuser.EditCurrentUserRequestDTO;
import pl.nakiel.projektZespolowy.resources.dto.editcurrentuser.EditCurrentUserResponseDTO;
import pl.nakiel.projektZespolowy.resources.dto.getallusers.GetAllUsersResponseDTO;
import pl.nakiel.projektZespolowy.resources.dto.getcurrentuser.GetCurrentUserResponseDTO;
import pl.nakiel.projektZespolowy.resources.dto.initfacebookuser.InitFacebookUserRequestDTO;
import pl.nakiel.projektZespolowy.resources.dto.initfacebookuser.InitFacebookUserResponseDTO;
import pl.nakiel.projektZespolowy.service.admin.IUserService;
import pl.nakiel.projektZespolowy.utils.converter.UserUserDTOConverter;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UsersController {

    @Autowired
    IUserService userService;

    @Autowired
    UserUserDTOConverter userUserDTOConverter;

    @ResponseBody
    @RequestMapping(value = "password",
            method = RequestMethod.PUT,
            consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequestDTO changePasswordRequestDTO){
        userService.changePassword(
                changePasswordRequestDTO.getOldPassword(),
                changePasswordRequestDTO.getNewPassword()
        );
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> createStandardUser(@RequestBody CreateStandardUserRequestDTO createStandardUserRequestDTO){
        return new ResponseEntity<>(new CreateStandardUserResponseDTO(), HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "facebook",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> initFacebookUser(@RequestBody InitFacebookUserRequestDTO initFacebookUserRequestDTO){
        return new ResponseEntity<>(new InitFacebookUserResponseDTO(), HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> getCurrentUser(){
        User user = userService.getCurrentUser();
        UserDTO userDTO = userUserDTOConverter.toUserDTO(user);
        GetCurrentUserResponseDTO getCurrentUserResponseDTO = new GetCurrentUserResponseDTO();
        getCurrentUserResponseDTO.setUser(userDTO);
        return new ResponseEntity<>(getCurrentUserResponseDTO, HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "",
            method = RequestMethod.PUT,
            consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> editCurrentUser(@RequestBody EditCurrentUserRequestDTO editCurrentUserRequestDTO){

        return new ResponseEntity<>(new EditCurrentUserResponseDTO(), HttpStatus.OK);
    }


    @ResponseBody
    @RequestMapping(value = "admin",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getAllUsers(){
        List<User> users = userService.getAllUsers();
        List<UserDTO> usersDTO = users.stream().map(u -> userUserDTOConverter.toUserDTO(u)).collect(Collectors.toList());
        GetAllUsersResponseDTO getAllUsersResponseDTO = new GetAllUsersResponseDTO();
        getAllUsersResponseDTO.setUsers(usersDTO);
        return new ResponseEntity<>(getAllUsersResponseDTO, HttpStatus.OK);
    }
}
