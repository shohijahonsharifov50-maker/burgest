package uz.burgesta.menu.domain;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/** A menu section such as "Burgers" or "Coffee". */
@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 60)
    private String slug;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "uz", column = @Column(name = "name_uz", nullable = false)),
            @AttributeOverride(name = "ru", column = @Column(name = "name_ru", nullable = false)),
            @AttributeOverride(name = "en", column = @Column(name = "name_en", nullable = false))
    })
    private LocalizedText name;

    /** Optional line under the section title, e.g. "with fries and a drink" for combos. */
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "uz", column = @Column(name = "note_uz")),
            @AttributeOverride(name = "ru", column = @Column(name = "note_ru")),
            @AttributeOverride(name = "en", column = @Column(name = "note_en"))
    })
    private LocalizedText note;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;

    @OneToMany(mappedBy = "category")
    @OrderBy("sortOrder ASC, id ASC")
    private List<MenuItem> items = new ArrayList<>();

    protected Category() {
        // for JPA
    }

    public Category(String slug, LocalizedText name, LocalizedText note, int sortOrder) {
        update(slug, name, note, sortOrder);
    }

    public final void update(String slug, LocalizedText name, LocalizedText note, int sortOrder) {
        this.slug = slug;
        this.name = name;
        this.note = note;
        this.sortOrder = sortOrder;
    }

    public Long getId() {
        return id;
    }

    public String getSlug() {
        return slug;
    }

    public LocalizedText getName() {
        return name;
    }

    public LocalizedText getNote() {
        return note;
    }

    public int getSortOrder() {
        return sortOrder;
    }

    public List<MenuItem> getItems() {
        return Collections.unmodifiableList(items);
    }
}
