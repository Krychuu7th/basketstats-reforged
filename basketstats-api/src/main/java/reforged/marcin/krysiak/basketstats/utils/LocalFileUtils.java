package reforged.marcin.krysiak.basketstats.utils;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.util.Strings;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.UUID;

import static org.apache.commons.io.FilenameUtils.getExtension;

@Slf4j
public class LocalFileUtils {

    public static final String TMP_DIR = System.getProperty("java.io.tmpdir") + "basketstats";

    public static File createTempDirectory() {
        return createDirectory("");
    }

    public static File createDirectory(String path) {
        File directory = new File(TMP_DIR, path);
        if (directory.mkdir()) {
            log.info(String.format("Created new directory: %s", directory.getPath()));
        }

        return directory;
    }

    @SneakyThrows
    public static File createFile(MultipartFile multipartFile) {
        createTempDirectory();
        File file = new File(TMP_DIR, getFileNameAsUUID(multipartFile.getOriginalFilename()));

        try (OutputStream os = new FileOutputStream(file)) {
            os.write(multipartFile.getBytes());
        }

        return file;
    }

    private static String getFileNameAsUUID(String fileName) {
        String fileExtension;
        if (Strings.isEmpty(fileExtension = getExtension(fileName))) {
            throw new RuntimeException("File lacks extension.");
        }
        return String.format("%s.%s", UUID.randomUUID(), fileExtension);
    }
}
