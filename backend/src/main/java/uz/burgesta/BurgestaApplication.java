package uz.burgesta;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class BurgestaApplication {

    public static void main(String[] args) {
        SpringApplication.run(BurgestaApplication.class, args);
    }
}
