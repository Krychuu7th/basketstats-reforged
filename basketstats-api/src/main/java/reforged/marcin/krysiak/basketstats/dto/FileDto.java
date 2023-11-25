package reforged.marcin.krysiak.basketstats.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class FileDto {
    private MultipartFile fileContent;
    private String fileName;
    private String filePath;
}

