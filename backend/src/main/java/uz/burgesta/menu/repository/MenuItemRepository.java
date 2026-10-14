package uz.burgesta.menu.repository;

import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import uz.burgesta.menu.domain.MenuItem;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {

    @EntityGraph(attributePaths = "category")
    @Query("select i from MenuItem i order by i.category.sortOrder, i.sortOrder, i.id")
    List<MenuItem> findAllInMenuOrder();

    @EntityGraph(attributePaths = "category")
    List<MenuItem> findByCategoryIdOrderBySortOrderAscIdAsc(Long categoryId);

    boolean existsByCategoryId(Long categoryId);

    @Query("select coalesce(max(i.sortOrder), 0) from MenuItem i where i.category.id = :categoryId")
    int findMaxSortOrder(@Param("categoryId") Long categoryId);

    /** Item counts per category id, used by the admin category list. */
    @Query("select i.category.id, count(i) from MenuItem i group by i.category.id")
    List<Object[]> countByCategory();
}
