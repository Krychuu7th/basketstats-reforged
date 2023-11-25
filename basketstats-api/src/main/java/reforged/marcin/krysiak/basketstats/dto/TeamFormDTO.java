package reforged.marcin.krysiak.basketstats.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class TeamFormDTO {
    private Long id;
    private String name;
    private Long leagueId;
    private MultipartFile fileContent;
    private String fileName;
}

