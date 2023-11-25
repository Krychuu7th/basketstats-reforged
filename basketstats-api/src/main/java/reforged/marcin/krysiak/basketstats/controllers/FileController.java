package reforged.marcin.krysiak.basketstats.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reforged.marcin.krysiak.basketstats.service.ftp.FtpService;

@RequestMapping("/api/file")
@RestController
@CrossOrigin
public class FileController {

    @Autowired
    FtpService ftpService;

    @GetMapping
    public ResponseEntity<byte[]> getFile(@RequestParam String path, @RequestParam String name) {

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, String.format("attachment; filename=\"%s\"", name))
                .body(ftpService.downloadFile(path));
    }

}
