package uz.burgesta.menu.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.util.Objects;

/** A short text stored in the three site languages: Uzbek, Russian and English. */
@Embeddable
public class LocalizedText {

    @Column(name = "uz", nullable = false, length = 160)
    private String uz;

    @Column(name = "ru", nullable = false, length = 160)
    private String ru;

    @Column(name = "en", nullable = false, length = 160)
    private String en;

    protected LocalizedText() {
        // for JPA
    }

    public LocalizedText(String uz, String ru, String en) {
        this.uz = uz;
        this.ru = ru;
        this.en = en;
    }

    public String getUz() {
        return uz;
    }

    public String getRu() {
        return ru;
    }

    public String getEn() {
        return en;
    }

    @Override
    public boolean equals(Object o) {
        return o instanceof LocalizedText other
                && Objects.equals(uz, other.uz) && Objects.equals(ru, other.ru) && Objects.equals(en, other.en);
    }

    @Override
    public int hashCode() {
        return Objects.hash(uz, ru, en);
    }
}
