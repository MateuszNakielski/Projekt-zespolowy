package pl.nakiel.projektZespolowy.resources.dto.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.List;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String secondName;
    private String phoneNumber;
    private Integer status;
    private String facebookId;
    @JsonIgnore
    private LocalizationDTO localization;
    private List<String> roles;
    private String password;
}
