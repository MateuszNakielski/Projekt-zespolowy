package pl.nakiel.projektZespolowy.service;

import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.nakiel.projektZespolowy.domain.events.Event;
import pl.nakiel.projektZespolowy.domain.security.User;
import pl.nakiel.projektZespolowy.domain.users.Notification;
import pl.nakiel.projektZespolowy.repository.NotificationRepository;
import pl.nakiel.projektZespolowy.security.SecurityService;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class NotificationService implements INotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private SecurityService securityService;
    @Override
    public void addNotification(Event event, User user, String content){
        Notification notification = new Notification();
        notification.setContent(content);
        notification.setEvent(event);
        notification.setRead(Boolean.FALSE);
        notification.setUser(user);
        notificationRepository.save(notification);
    }

    @Override
    public List<Notification> getNotifications(){
        User user = securityService.getCurrentUser();
        List<Notification> notifications = notificationRepository.getNotificationsByUserAndRead(user,Boolean.FALSE);
        for(Notification notification : notifications){
            notification.setRead(Boolean.TRUE);
            notificationRepository.save(notification);
        }
        return notifications;
    }
}
