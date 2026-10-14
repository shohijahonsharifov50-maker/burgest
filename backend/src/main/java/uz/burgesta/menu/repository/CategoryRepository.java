package uz.burgesta.menu.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import uz.burgesta.menu.domain.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    /** All categories with their items loaded in one query, in menu order. */
    @Query("select distinct c from Category c left join fetch c.items order by c.sortOrder, c.id")
    List<Category> findAllWithItems();

    List<Category> findAllByOrderBySortOrderAscIdAsc();

    @Query("select coalesce(max(c.sortOrder), 0) from Category c")
    int findMaxSortOrder();

    boolean existsBySlug(String slug);

    boolean existsBySlugAndIdNot(String slug, Long id);
}
