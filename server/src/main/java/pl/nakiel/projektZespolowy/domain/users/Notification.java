package pl.nakiel.projektZespolowy.domain.users;

import lombok.Data;
import org.hibernate.annotations.Type;
import pl.nakiel.projektZespolowy.domain.events.Event;
import pl.nakiel.projektZespolowy.domain.security.User;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name="NOTIFICATIONS")
public class Notification implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="ID")
    private Long id;

    @ManyToOne( fetch = FetchType.LAZY)
    @JoinColumn(name="EVENT_ID")
    private Event event;

    @ManyToOne( fetch = FetchType.LAZY)
    @JoinColumn(name="USER_ID")
    private User user;

    @Column(name="CONTENT")
    private String content;

    @Column(name="IS_READ")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private Boolean read;
}
