package pl.nakiel.projektZespolowy.utils.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.nakiel.projektZespolowy.domain.events.Event;
import pl.nakiel.projektZespolowy.domain.geo.Localization;
import pl.nakiel.projektZespolowy.resources.dto.common.EventDTO;
import pl.nakiel.projektZespolowy.resources.dto.common.LocalizationDTO;

import java.util.stream.Collectors;

@Service
@Transactional
public class EventEventDTOConverter {
    @Autowired
    private UserUserDTOConverter userUserDTOConverter;
    @Autowired
    private CommentCommentDTOConverter commentCommentDTOConverter;
    @Autowired
    private ImageImageDTOConverter imageImageDTOConverter;

    public EventDTO toEventDTO(Event event) {
        EventDTO eventDTO = new EventDTO();
        eventDTO.setAuthor(userUserDTOConverter.toUserDTO(event.getEventsAuthor()));
        eventDTO.setComments(
                event
                    .getEventsComments()
                    .stream()
                    .map(e -> commentCommentDTOConverter.toCommentDTO(e))
                    .collect(Collectors.toList())
        );
        eventDTO.setId(event.getId());
        eventDTO.setTitle(event.getTitle());
        eventDTO.setDescription(event.getDescription());
        eventDTO.setSubmissionDate(event.getDate());
        eventDTO.setType(event.getType());
        eventDTO.setViews(event.getViews());
        Localization loc = event.getLocalization();
        LocalizationDTO locDto = new LocalizationDTO();
        locDto.setLatitude(loc.getLatitude());
        locDto.setLongitude(loc.getLongitude());
        eventDTO.setLocalization(locDto);
        eventDTO.setFollowingUsers(
                event
                    .getFollowingUsers()
                    .stream()
                    .map(u->userUserDTOConverter.toUserDTO(u))
                    .collect(Collectors.toList())
        );
        eventDTO.setImages(
                event
                    .getEventsImages()
                    .stream()
                    .map(i->imageImageDTOConverter.toImageDTO(i))
                    .collect(Collectors.toList())
        );
        eventDTO.setActive(event.getActive());
        return eventDTO;
    }
}
