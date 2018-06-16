package pl.nakiel.projektZespolowy.repository;

import org.aspectj.weaver.ast.Not;
import org.springframework.data.jpa.repository.JpaRepository;
import pl.nakiel.projektZespolowy.domain.events.Event;
import pl.nakiel.projektZespolowy.domain.security.User;
import pl.nakiel.projektZespolowy.domain.users.Notification;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> getNotificationsByUserAndRead(User user,Boolean read);
    List<Notification> getNotificationsByEvent(Event event);
}
