package pl.nakiel.projektZespolowy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.nakiel.projektZespolowy.domain.security.User;
import pl.nakiel.projektZespolowy.domain.users.Notification;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> getNotificationsByUserAndRead(User user,Boolean read);
}
