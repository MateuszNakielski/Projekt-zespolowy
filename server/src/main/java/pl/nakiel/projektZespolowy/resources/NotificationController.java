package pl.nakiel.projektZespolowy.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.nakiel.projektZespolowy.domain.users.Notification;
import pl.nakiel.projektZespolowy.resources.dto.common.NotificationDTO;
import pl.nakiel.projektZespolowy.service.INotificationService;
import pl.nakiel.projektZespolowy.utils.converter.NotificationNotificationDTOConverter;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin
public class NotificationController {

    @Autowired
    INotificationService notificationService;
    @Autowired
    NotificationNotificationDTOConverter notificationNotificationDTOConverter;
    @ResponseBody
    @RequestMapping(value = "",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @PreAuthorize("hasAuthority('STANDARD_USER')")
    public ResponseEntity getNotifications(){
        List<Notification> notifications = notificationService.getNotifications();
        List<NotificationDTO> notificationDTOs = new ArrayList<NotificationDTO>();
        for(Notification notification : notifications)
            notificationDTOs.add(notificationNotificationDTOConverter.toNotificationDTO(notification));
        return ResponseEntity.ok().body(notificationDTOs);
    }
}
