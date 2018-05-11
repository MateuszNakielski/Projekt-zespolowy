package pl.nakiel.projektZespolowy.utils.exception;

public class UsernameExistsException extends Throwable {
    public UsernameExistsException(String istnieje_użytkownik_o_wskazanej_roli) {
        super(istnieje_użytkownik_o_wskazanej_roli);
    }
}
