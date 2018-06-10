package pl.nakiel.projektZespolowy.resources.dto.addphototoevent;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import pl.nakiel.projektZespolowy.resources.dto.common.ImageDTO;

@Data
@NoArgsConstructor
public class AddPhotoToEventDTO {
    ImageDTO image;
}
