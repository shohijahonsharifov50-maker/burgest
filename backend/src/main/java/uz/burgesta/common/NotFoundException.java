package uz.burgesta.common;

/** Thrown when a requested record does not exist. Mapped to HTTP 404. */
public class NotFoundException extends RuntimeException {

    public NotFoundException(String resource, Object id) {
        super("%s %s not found".formatted(resource, id));
    }
}
