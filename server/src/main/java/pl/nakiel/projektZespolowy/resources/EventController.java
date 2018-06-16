package pl.nakiel.projektZespolowy.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.nakiel.projektZespolowy.resources.dto.addcomment.AddCommentRequestDTO;
import pl.nakiel.projektZespolowy.resources.dto.addevent.AddEventRequestDTO;
import pl.nakiel.projektZespolowy.resources.dto.addevent.AddEventResponseDTO;
import pl.nakiel.projektZespolowy.resources.dto.addphototoevent.AddPhotoToEventDTO;
import pl.nakiel.projektZespolowy.resources.dto.common.EventDTO;
import pl.nakiel.projektZespolowy.resources.dto.followevent.FollowEventRequestDTO;
import pl.nakiel.projektZespolowy.resources.dto.getallevents.GetAllEventsResponseDTO;
import pl.nakiel.projektZespolowy.resources.dto.getevent.GetEventResponseDTO;
import pl.nakiel.projektZespolowy.service.IEventService;
import pl.nakiel.projektZespolowy.utils.exception.NotFoundException;
import java.util.List;

@RestController
@RequestMapping("/api/event")
@CrossOrigin
public class EventController {

    @Autowired
    IEventService eventService;

    @ResponseBody
    @RequestMapping(value = "{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    //@PreAuthorize("hasAuthority('STANDARD_USER')")
    public ResponseEntity<?> getEvent(@PathVariable("id") Long eventId){
        GetEventResponseDTO getEventResponseDTO = new GetEventResponseDTO();
        EventDTO eventDTO = null;
        try {
            eventDTO = eventService.getEvent(eventId);
        } catch (NotFoundException e) {
            return  new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        getEventResponseDTO.setEvent(eventDTO);
        return new ResponseEntity(getEventResponseDTO, HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    //@PreAuthorize("hasAuthority('STANDARD_USER')")
    public ResponseEntity<?> getAllEvents(){
        GetAllEventsResponseDTO getAllEventsResponseDTO = new GetAllEventsResponseDTO();
        List<EventDTO> eventDTO = eventService.getAllEvents();
        getAllEventsResponseDTO.setEvents(eventDTO);
        return new ResponseEntity(getAllEventsResponseDTO, HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @PreAuthorize("hasAuthority('STANDARD_USER')")
    public ResponseEntity<?> addEvent(@RequestBody AddEventRequestDTO addEventRequestDTO){
        AddEventResponseDTO addEventResponseDTO = new AddEventResponseDTO();
        EventDTO eventDTO = eventService.addEvent(addEventRequestDTO.getEvent());
        addEventResponseDTO.setEvent(eventDTO);
        return new ResponseEntity(addEventResponseDTO, HttpStatus.CREATED);
    }

    @ResponseBody
    @RequestMapping(value = "/comments",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @PreAuthorize("hasAuthority('STANDARD_USER')")
    public ResponseEntity addComment(@RequestBody AddCommentRequestDTO addCommentRequestDTO){
        eventService.addComment(addCommentRequestDTO.getEvent().getId(), addCommentRequestDTO.getComment());
        return new ResponseEntity(HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "/{id}/followers",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @PreAuthorize("hasAuthority('STANDARD_USER')")
    public ResponseEntity followEvent(@PathVariable("id") Long id){
        eventService.followEvent(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "/{id}/photos",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @PreAuthorize("hasAuthority('STANDARD_USER')")
    public ResponseEntity addPhotoToEvent(@PathVariable("id") Long id, @RequestBody AddPhotoToEventDTO addPhotoToEventDTO){
        eventService.addImage(id, addPhotoToEventDTO.getImage());
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @ResponseBody
    @RequestMapping(value = "/{id}/photos/{photoId}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @PreAuthorize("hasAuthority('STANDARD_USER')")
    public ResponseEntity removePhotoFromEvent(@PathVariable("id") Long id, @PathVariable("photoId") Long photoId){
        eventService.removeImage(id,photoId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "/{id}",
            method = RequestMethod.PATCH,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity patchEvent(@PathVariable("id") Long id, @RequestBody AddEventRequestDTO addEventRequestDTO){
        eventService.updateEvent(id, addEventRequestDTO.getEvent());
        return ResponseEntity.ok().build();
    }


}
