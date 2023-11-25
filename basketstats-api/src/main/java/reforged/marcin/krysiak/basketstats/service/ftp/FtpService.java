package reforged.marcin.krysiak.basketstats.service.ftp;

import org.springframework.web.multipart.MultipartFile;

public interface FtpService {

    String uploadFile(MultipartFile multipartFile, String directoryPath);
    byte[] downloadFile(String path);
    boolean createDirectory(String path);
    boolean renameFile(String oldPath, String newPath);
    boolean deleteFile(String path);
}
