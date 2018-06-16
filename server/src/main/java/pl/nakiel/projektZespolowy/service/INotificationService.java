package pl.nakiel.projektZespolowy.service;

import pl.nakiel.projektZespolowy.domain.events.Event;
import pl.nakiel.projektZespolowy.domain.security.User;
import pl.nakiel.projektZespolowy.domain.users.Notification;

import java.util.List;

public interface INotificationService {
    void addNotification(Event event, User user, String content);

    List<Notification> getNotifications();
}
