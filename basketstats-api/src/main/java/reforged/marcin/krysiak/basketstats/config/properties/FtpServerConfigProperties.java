package reforged.marcin.krysiak.basketstats.config.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@ConfigurationProperties(prefix = "ftp.server")
@Component
public class FtpServerConfigProperties {

    private String host = "localhost";
    private int port = 2121;
    private String username = "anonymous";
    private String password = "";
}
