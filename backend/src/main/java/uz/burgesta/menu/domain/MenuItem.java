package uz.burgesta.menu.domain;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.Instant;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

/** A dish or drink with its price in UZS. */
@Entity
@Table(name = "menu_item")
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "uz", column = @Column(name = "name_uz", nullable = false)),
            @AttributeOverride(name = "ru", column = @Column(name = "name_ru", nullable = false)),
            @AttributeOverride(name = "en", column = @Column(name = "name_en", nullable = false))
    })
    private LocalizedText name;

    @Column(nullable = false)
    private long price;

    @Column(name = "weight_grams")
    private Integer weightGrams;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ItemTag tag;

    @Column(nullable = false)
    private boolean available = true;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    protected MenuItem() {
        // for JPA
    }

    public MenuItem(Category category, LocalizedText name, long price, Integer weightGrams,
                    ItemTag tag, boolean available, int sortOrder) {
        update(category, name, price, weightGrams, tag, available, sortOrder);
    }

    public final void update(Category category, LocalizedText name, long price, Integer weightGrams,
                             ItemTag tag, boolean available, int sortOrder) {
        this.category = category;
        this.name = name;
        this.price = price;
        this.weightGrams = weightGrams;
        this.tag = tag;
        this.available = available;
        this.sortOrder = sortOrder;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public Long getId() {
        return id;
    }

    public Category getCategory() {
        return category;
    }

    public LocalizedText getName() {
        return name;
    }

    public long getPrice() {
        return price;
    }

    public Integer getWeightGrams() {
        return weightGrams;
    }

    public ItemTag getTag() {
        return tag;
    }

    public boolean isAvailable() {
        return available;
    }

    public int getSortOrder() {
        return sortOrder;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }
}
