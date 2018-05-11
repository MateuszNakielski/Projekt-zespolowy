package pl.nakiel.projektZespolowy.utils.exception;

public class NotFoundException extends Throwable {
    public NotFoundException(String event_with_id_doesnt_exist) {
        super(event_with_id_doesnt_exist);
    }
}
