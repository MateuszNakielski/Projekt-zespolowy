package pl.nakiel.projektZespolowy.resources.dto.addphototoevent;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import pl.nakiel.projektZespolowy.resources.dto.common.ImageDTO;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class AddPhotoToEventDTO {
    ImageDTO image;
}
