package pl.nakiel.projektZespolowy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.crypto.codec.Base64;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.nakiel.projektZespolowy.domain.events.Comment;
import pl.nakiel.projektZespolowy.domain.events.Event;
import pl.nakiel.projektZespolowy.domain.events.Image;
import pl.nakiel.projektZespolowy.domain.geo.Localization;
import pl.nakiel.projektZespolowy.domain.security.User;
import pl.nakiel.projektZespolowy.repository.CommentRepository;
import pl.nakiel.projektZespolowy.repository.EventRepository;
import pl.nakiel.projektZespolowy.repository.ImageRepository;
import pl.nakiel.projektZespolowy.repository.LocalizationRepository;
import pl.nakiel.projektZespolowy.resources.dto.common.CommentDTO;
import pl.nakiel.projektZespolowy.resources.dto.common.EventDTO;
import pl.nakiel.projektZespolowy.resources.dto.common.ImageDTO;
import pl.nakiel.projektZespolowy.security.SecurityService;
import pl.nakiel.projektZespolowy.service.admin.IUserService;
import pl.nakiel.projektZespolowy.service.admin.UserService;
import pl.nakiel.projektZespolowy.utils.converter.EventEventDTOConverter;
import pl.nakiel.projektZespolowy.utils.exception.NotFoundException;

import javax.persistence.EntityNotFoundException;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class EventService implements IEventService{

    @Autowired
    private FileService fileService;

    @Autowired
    private LocalizationRepository localizationRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private IUserService userService;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private INotificationService notificationService;


    @Autowired
    private EventEventDTOConverter eventEventDTOConverter;

    @Override
    public EventDTO addEvent(EventDTO eventDTO){
        Event event = new Event();
        event.setTitle(eventDTO.getTitle());
        event.setDescription(eventDTO.getDescription());
        event.setDate(new Date());
        Localization localization = new Localization();
        localization.setLatitude(eventDTO.getLocalization().getLatitude());
        localization.setLongitude(eventDTO.getLocalization().getLongitude());
        localization = localizationRepository.save(localization);
        event.setLocalization(localization);
        event.setType(eventDTO.getType());
        event.setViews(new Long(0));
        event.setActive(true);
        event.setEventsAuthor(securityService.getCurrentUser());
        event.getFollowingUsers().add(securityService.getCurrentUser());
        for(ImageDTO image: eventDTO.getImages()){
            String url = fileService.store(
                    Base64.decode(image.getFileContent().getBytes()),
                    image.getFileName()
            );
            Image im = new Image();
            im.setImagesEvent(event);
            im.setUrl(url);
            im = imageRepository.save(im);
            event.getEventsImages().add(im);
        }
        event = eventRepository.save(event);
        return eventEventDTOConverter.toEventDTO(event);
    }

    @Override
    public void followEvent(Long eventId){
        Event event = eventRepository.getOne(eventId);
        if(!event.getFollowingUsers().contains(securityService.getCurrentUser()))
            event.getFollowingUsers().add(securityService.getCurrentUser());
        eventRepository.save(event);
        for(User user : event.getFollowingUsers()){
            if(user.getId() != securityService.getCurrentUser().getId())
                notificationService.addNotification(event, user, "Kolejna osoba obserwuje zdarzenie");
        }
    }

    @Override
    public void addComment(Long eventId, CommentDTO commentDTO){
        Event event = eventRepository.getOne(eventId);
        Comment comment = new Comment();
        comment.setComment(commentDTO.getComment());
        comment.setDate(new Date());
        comment.setCommentsAuthor(securityService.getCurrentUser());
        comment.setCommentsEvent(eventRepository.getOne(eventId));
        for(User user : event.getFollowingUsers()){
            notificationService.addNotification(event, user, "Pojawił się nowy komentarz w zdarzeniu, które obserwujesz");
        }
        comment = commentRepository.save(comment);
        eventRepository.save(event);
    }

    @Override
    public void removeComment(CommentDTO commentDTO) throws Exception {
        Comment comment = commentRepository.getOne(commentDTO.getId());
        User currentUser = securityService.getCurrentUser();
        User author = comment.getCommentsAuthor();
        if(userService.hasRole(currentUser, "ADMIN") || currentUser.equals(author)) {
            commentRepository.delete(comment);
            for(User user : comment.getCommentsEvent().getFollowingUsers()){
                notificationService.addNotification(comment.getCommentsEvent(), user, "Usunięto komentarz");
            }
        }else{
            throw new Exception("Current user can't remove comment");
        }
    }

    @Override
    public EventDTO getEvent(Long eventId) throws NotFoundException {
        Event event = eventRepository.findOne(eventId);
        if(event == null)
            throw new NotFoundException("Event with id doesnt exist");
        event.setViews(event.getViews()+1);
        event = eventRepository.save(event);
        return eventEventDTOConverter.toEventDTO(event);
    }
    @Override
    public List<EventDTO> getAllEvents(){
        return eventRepository
                .findOneByActive(true)
                .stream()
                .map(e->eventEventDTOConverter.toEventDTO(e))
                .collect(Collectors.toList());
    }

    @Override
    public void addImage(Long eventId, ImageDTO image){
        Event event = eventRepository.getOne(eventId);
        Image im = new Image();
        String url = fileService.store(
                Base64.decode(image.getFileContent().getBytes()),
                image.getFileName()
        );
        im.setImagesEvent(event);
        im.setUrl(url);
        im = imageRepository.save(im);
        event.getEventsImages().add(im);
        eventRepository.save(event);
        for(User user : event.getFollowingUsers()){
            notificationService.addNotification(event, user, "Pojawił się nowy obraz w zdarzeniu, które obserwujesz");
        }
    }

    @Override
    public void removeImage(Long id, Long photoId){
        Image im = imageRepository.getOne(photoId);
        if(im.getImagesEvent().getId() != id)
            throw new EntityNotFoundException();
        for(User user : im.getImagesEvent().getFollowingUsers()){
            notificationService.addNotification(im.getImagesEvent(), user, "Usunięto obraz");
        }
        im.setImagesEvent(null);
        imageRepository.save(im);
    }


}