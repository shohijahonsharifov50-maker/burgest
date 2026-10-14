package uz.burgesta.common;

/** Thrown when a change would break a business rule (duplicate slug, non-empty category). Mapped to HTTP 409. */
public class ConflictException extends RuntimeException {

    public ConflictException(String message) {
        super(message);
    }
}
