package pl.nakiel.projektZespolowy.resources.dto.common;

import lombok.Data;

@Data
public class NotificationDTO {
    public Long event;
    public String content;
}
