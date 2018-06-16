package pl.nakiel.projektZespolowy.config;

import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import pl.nakiel.projektZespolowy.config.dto.ExceptionDTO;

import javax.persistence.EntityNotFoundException;
import java.util.Locale;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@ControllerAdvice
public class GlobalExceptionHandler {

    @Setter
    @Autowired
    private MessageSource messageSource;

    @ExceptionHandler(Exception.class)
    public ResponseEntity onException(Exception ex, Locale locale) {
        ex.printStackTrace();
        return createResponse(ex, INTERNAL_SERVER_ERROR, locale);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity onAccountNotFoundException(EntityNotFoundException ex, Locale locale) {
        ex.printStackTrace();
        return createResponse(ex, NOT_FOUND, locale);
    }

    private ResponseEntity createResponse(Exception ex, HttpStatus status, Locale locale) {
        String exceptionName = ex.getClass().getSimpleName();
        String description;
        try {
            description = messageSource.getMessage(ex.getClass().getSimpleName(), null, locale);
        } catch (NoSuchMessageException exception) {
            description = exceptionName;

        }
        return ResponseEntity.status(status).body(new ExceptionDTO(description, ex.getMessage()));
    }

}