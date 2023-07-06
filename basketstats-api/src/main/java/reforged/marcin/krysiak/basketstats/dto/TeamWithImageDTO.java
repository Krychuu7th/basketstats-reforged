package reforged.marcin.krysiak.basketstats.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class TeamWithImageDTO {
    private String name;
    private String imageName;
    private Long leagueId;
    private MultipartFile imageFile;
}

