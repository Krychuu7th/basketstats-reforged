package reforged.marcin.krysiak.basketstats.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Null;

@Getter
@Setter
public class TeamWithLogoDTO {
    private String name;
    private String logo;
    private Long leagueId;
    private MultipartFile logoFile;
}

