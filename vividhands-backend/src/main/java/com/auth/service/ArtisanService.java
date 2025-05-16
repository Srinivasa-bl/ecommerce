package com.auth.service;

import com.auth.dto.ArtisanRegisterRequest;
import com.auth.model.Artisan;
import com.auth.repository.ArtisanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class ArtisanService {

    private final ArtisanRepository artisanRepository;
    private final PasswordEncoder passwordEncoder;
    private final FileStorageService fileStorageService;

    public Artisan createArtisan(ArtisanRegisterRequest request, MultipartFile certificate) {

        if (artisanRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        try {
            // Store the uploaded certificate and get the path
            String certificatePath = fileStorageService.storeFile(certificate);

            // Create and save the artisan object
            Artisan artisan = Artisan.builder()
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword())) // Encode password
                    .role("ROLE_ARTISAN") // Add proper Spring Security role prefix
                    .name(request.getName())
                    .category(request.getCategory())
                    .experience(request.getExperience())
                    .mobile(request.getMobile())
                    .location(request.getLocation())
                    .materialsUsed(request.getMaterialsUsed())
                    .certificatePath(certificatePath)
                    .build();

            return artisanRepository.save(artisan);

        } catch (IOException e) {
            throw new RuntimeException("File storage failed: " + e.getMessage(), e);
        }
    }
}
