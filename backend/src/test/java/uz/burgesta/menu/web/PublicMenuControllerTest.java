package uz.burgesta.menu.web;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class PublicMenuControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    void returnsSeededMenuInOrderWithoutAuthentication() throws Exception {
        mvc.perform(get("/api/menu"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(10)))
                .andExpect(jsonPath("$[0].slug").value("combo"))
                .andExpect(jsonPath("$[0].note.en").value("with fries and a drink"))
                .andExpect(jsonPath("$[0].items[0].name.uz").value("Steyk burger kombo"))
                .andExpect(jsonPath("$[0].items[0].price").value(75000))
                .andExpect(jsonPath("$[0].items[0].tag").value("HIT"))
                .andExpect(jsonPath("$[1].slug").value("burger"))
                .andExpect(jsonPath("$[1].items", hasSize(13)))
                .andExpect(jsonPath("$[9].slug").value("cold"));
    }
}
