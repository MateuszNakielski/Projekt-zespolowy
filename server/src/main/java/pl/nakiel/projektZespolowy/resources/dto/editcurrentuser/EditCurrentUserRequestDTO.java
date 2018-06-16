package pl.nakiel.projektZespolowy.resources.dto.editcurrentuser;

import lombok.Data;
import pl.nakiel.projektZespolowy.resources.dto.common.UserDTO;

@Data
public class EditCurrentUserRequestDTO {
    UserDTO user;
}
