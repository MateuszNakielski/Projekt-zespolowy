package pl.nakiel.projektZespolowy.config.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "exception")
@AllArgsConstructor
@Data
public class ExceptionDTO {

    private String description;
    private String message;

}
