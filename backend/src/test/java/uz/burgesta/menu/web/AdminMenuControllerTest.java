package uz.burgesta.menu.web;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.not;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.RequestPostProcessor;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class AdminMenuControllerTest {

    private static final RequestPostProcessor ADMIN = httpBasic("admin", "test-password");

    @Autowired
    private MockMvc mvc;

    @Test
    void rejectsRequestsWithoutValidCredentials() throws Exception {
        mvc.perform(get("/api/admin/items"))
                .andExpect(status().isUnauthorized())
                .andExpect(header().doesNotExist("WWW-Authenticate"));
        mvc.perform(get("/api/admin/me").with(httpBasic("admin", "wrong")))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void returnsProfileForValidCredentials() throws Exception {
        mvc.perform(get("/api/admin/me").with(ADMIN))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("admin"));
    }

    @Test
    void listsCategoriesWithItemCounts() throws Exception {
        mvc.perform(get("/api/admin/categories").with(ADMIN))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(10)))
                .andExpect(jsonPath("$[1].slug").value("burger"))
                .andExpect(jsonPath("$[1].itemCount").value(13));
    }

    @Test
    void createdItemAppearsOnPublicMenuAndHidesWhenUnavailable() throws Exception {
        long burgerId = categoryId("burger");
        String body = """
                {"categoryId": %d, "name": {"uz": "Achchiq burger", "ru": "Острый бургер", "en": "Spicy Burger"},
                 "price": 45000, "weightGrams": 300, "tag": "HIT"}
                """.formatted(burgerId);

        String created = mvc.perform(post("/api/admin/items").with(ADMIN)
                        .contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.available").value(true))
                .andExpect(jsonPath("$.sortOrder").value(14))
                .andReturn().getResponse().getContentAsString();
        long itemId = ((Number) JsonPath.read(created, "$.id")).longValue();

        mvc.perform(get("/api/menu"))
                .andExpect(jsonPath("$[1].items[*].name.en", hasItem("Spicy Burger")));

        mvc.perform(patch("/api/admin/items/{id}/availability", itemId).with(ADMIN)
                        .contentType(MediaType.APPLICATION_JSON).content("{\"available\": false}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.available").value(false));

        mvc.perform(get("/api/menu"))
                .andExpect(jsonPath("$[1].items[*].name.en", not(hasItem("Spicy Burger"))));

        mvc.perform(delete("/api/admin/items/{id}", itemId).with(ADMIN))
                .andExpect(status().isNoContent());
        mvc.perform(delete("/api/admin/items/{id}", itemId).with(ADMIN))
                .andExpect(status().isNotFound());
    }

    @Test
    void rejectsInvalidItem() throws Exception {
        String body = """
                {"categoryId": 1, "name": {"uz": "", "ru": "Бургер", "en": "Burger"}, "price": -5}
                """;
        mvc.perform(post("/api/admin/items").with(ADMIN)
                        .contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors['name.uz']").exists())
                .andExpect(jsonPath("$.errors.price").exists());
    }

    @Test
    void refusesToDeleteCategoryThatStillHasItems() throws Exception {
        mvc.perform(delete("/api/admin/categories/{id}", categoryId("burger")).with(ADMIN))
                .andExpect(status().isConflict());
    }

    @Test
    void refusesDuplicateCategorySlug() throws Exception {
        String body = """
                {"slug": "burger", "name": {"uz": "Yana", "ru": "Ещё", "en": "More"}}
                """;
        mvc.perform(post("/api/admin/categories").with(ADMIN)
                        .contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isConflict());
    }

    private long categoryId(String slug) throws Exception {
        String json = mvc.perform(get("/api/admin/categories").with(ADMIN))
                .andReturn().getResponse().getContentAsString();
        return ((Number) JsonPath.<java.util.List<Object>>read(json, "$[?(@.slug == '" + slug + "')].id").get(0)).longValue();
    }
}
