package com.auth.service;

import com.auth.model.Artisan;
import com.auth.model.User;
import com.auth.repository.ArtisanRepository;
import com.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final ArtisanRepository artisanRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // First check if Artisan exists
        Artisan artisan = artisanRepository.findByEmail(email)
                .orElse(null);

        if (artisan != null) {
            return buildArtisanDetails(artisan);
        }

        // Then fallback to general User
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return buildUserDetails(user);
    }

    private UserDetails buildArtisanDetails(Artisan artisan) {
        return org.springframework.security.core.userdetails.User
                .withUsername(artisan.getEmail())
                .password(artisan.getPassword())
                .authorities("ROLE_ARTISAN") //  Role prefixed with "ROLE_"
                .build();
    }

    private UserDetails buildUserDetails(User user) {
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities(user.getRole()) //  Ensures all roles are prefixed with "ROLE_"
                .build();
    }
}
