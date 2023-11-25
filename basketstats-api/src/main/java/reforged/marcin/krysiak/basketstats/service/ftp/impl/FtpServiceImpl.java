package reforged.marcin.krysiak.basketstats.service.ftp.impl;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.net.ProtocolCommandEvent;
import org.apache.commons.net.ProtocolCommandListener;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import reforged.marcin.krysiak.basketstats.config.properties.FtpServerConfigProperties;
import reforged.marcin.krysiak.basketstats.constants.CacheKeys;
import reforged.marcin.krysiak.basketstats.service.ftp.FtpService;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.nio.file.Paths;

import static reforged.marcin.krysiak.basketstats.utils.LocalFileUtils.createFile;

@Slf4j
@Service
@RequiredArgsConstructor
@ConditionalOnProperty("ftp.enabled")
public class FtpServiceImpl implements FtpService {
    private static final String FILE_CACHE_UNLESS = "#result.length > 2000000"; // 2MB
    private final FtpServerConfigProperties ftpServerConfigProperties;

    public String uploadFile(MultipartFile multipartFile, String directoryPath) {
        return uploadFile(createFile(multipartFile), directoryPath);
    }

    @Cacheable(value = CacheKeys.FILE, unless = FILE_CACHE_UNLESS)
    @SneakyThrows
    public byte[] downloadFile(String path) {
        FTPClient ftpClient = getFtpClient();
        try {
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            if (ftpClient.retrieveFile(path, byteArrayOutputStream)) {
                log.info(String.format("[FTP] Successfully downloaded file : %s", path));

                return byteArrayOutputStream.toByteArray();
            }
            log.error(String.format("[FTP] Something went wrong trying to download directory : %s", path));

            return null;
        } finally {
            ftpClient.logout();
        }
    }

    @SneakyThrows
    public boolean createDirectory(String path) {
        FTPClient ftpClient = getFtpClient();
        try {
            if (ftpClient.makeDirectory(path)) {
                log.info(String.format("[FTP] Successfully created directory : %s", path));

                return true;
            }
            log.error(String.format("[FTP] Something went wrong trying to create directory : %s", path));

            return false;
        } finally {
            ftpClient.logout();
        }
    }

    @SneakyThrows
    public boolean renameFile(String oldPath, String newPath) {
        FTPClient ftpClient = getFtpClient();
        try {
            if (ftpClient.rename(oldPath, newPath)) {
                log.info(String.format("[FTP] Successfully renamed file : %s -> %s", oldPath, newPath));

                return true;
            }
            log.error(String.format("[FTP] Something went wrong trying to rename file : %s -> %s", oldPath, newPath));

            return false;
        } finally {
            ftpClient.logout();
        }
    }

    @SneakyThrows
    private String uploadFile(File file, String directoryPath) {
        FTPClient ftpClient = getFtpClient();
        try {
            String ftpFilePath = Paths.get(directoryPath, file.getName()).toString();
            try (FileInputStream fileInputStream = new FileInputStream(file)) {
                if (ftpClient.storeFile(ftpFilePath, fileInputStream)) {
                    log.info(String.format("[FTP] Successfully uploaded file : %s", ftpFilePath));

                    return ftpFilePath;
                }
            } finally {
                file.delete();
            }
            log.error(String.format("[FTP] Something went wrong trying to upload file : %s", ftpFilePath));

            return null;
        } finally {
            ftpClient.logout();
        }
    }

    @SneakyThrows
    public boolean deleteFile(String path) {
        FTPClient ftpClient = getFtpClient();
        try {
            if (ftpClient.deleteFile(path)) {
                log.info(String.format("[FTP] Successfully deleted file : %s", path));

                return true;
            }
            log.error(String.format("[FTP] Something went wrong trying to delete file : %s", path));

            return false;
        } finally {
            ftpClient.logout();
        }
    }

    @SneakyThrows
    private FTPClient getFtpClient() {
        FTPClient ftpClient = new FTPClient();
        ftpClient.addProtocolCommandListener(new ProtocolCommandListener() {
            @Override
            public void protocolCommandSent(ProtocolCommandEvent protocolCommandEvent) {
//                System.out.printf(
//                        "[%s][%d] Command sent : [%s]-%s",
//                        Thread.currentThread().getName(),
//                        System.currentTimeMillis(),
//                        protocolCommandEvent.getCommand(),
//                        protocolCommandEvent.getMessage()
//                );
            }

            @Override
            public void protocolReplyReceived(ProtocolCommandEvent protocolCommandEvent) {
//                System.out.printf(
//                        "[%s][%d] Reply received: %s",
//                        Thread.currentThread().getName(),
//                        System.currentTimeMillis(),
//                        protocolCommandEvent.getMessage()
//                );
            }
        });

        ftpClient.connect(ftpServerConfigProperties.getHost(), ftpServerConfigProperties.getPort());
        ftpClient.login(ftpServerConfigProperties.getUsername(), ftpServerConfigProperties.getPassword());
        ftpClient.setFileType(FTP.BINARY_FILE_TYPE);

        return ftpClient;
    }
}
