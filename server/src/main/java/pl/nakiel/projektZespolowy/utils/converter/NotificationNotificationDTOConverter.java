package pl.nakiel.projektZespolowy.utils.converter;

import org.springframework.stereotype.Service;
import pl.nakiel.projektZespolowy.domain.users.Notification;
import pl.nakiel.projektZespolowy.resources.dto.common.NotificationDTO;

@Service
public class NotificationNotificationDTOConverter {
    public NotificationDTO toNotificationDTO(Notification notification){
        NotificationDTO notificationDTO = new NotificationDTO();
        notificationDTO.setContent(notification.getContent());
        notificationDTO.setEvent(notification.getEvent().getId());
        return notificationDTO;
    }
}
