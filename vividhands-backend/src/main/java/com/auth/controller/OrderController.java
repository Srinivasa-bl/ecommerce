package com.auth.controller;

import com.auth.dto.OrderDTO;
import com.auth.model.Order;
import com.auth.model.User;
import com.auth.repository.ArtisanRepository;
import com.auth.repository.OrderRepository;
import com.auth.repository.UserRepository;
import com.auth.service.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final ArtisanRepository artisanRepository;

    // Get all orders for a user with successful payments
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getUserOrders(
            @PathVariable Long userId,
            @RequestHeader("Authorization") String token) {

        User user = validateUser(userId, token);
        List<Order> orders = orderRepository.findByUserAndRazorpayPaymentIdIsNotNull(user);
        return ResponseEntity.ok(orders);
    }

    // Get single order with items (for regular users)
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderWithItems(
            @PathVariable Long orderId,
            @RequestHeader("Authorization") String token) {

        Order order = orderRepository.findByIdWithItems(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        validateUser(order.getUser().getId(), token);
        return ResponseEntity.ok(order);
    }

    // Get orders by date range
    @GetMapping("/filter")
    public ResponseEntity<List<Order>> getOrdersByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end,
            @RequestHeader("Authorization") String token) {

        String email = jwtUtil.extractUsername(token.substring(7));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Order> orders = orderRepository.findByOrderDateBetweenAndUser(start, end, user);
        return ResponseEntity.ok(orders);
    }

    // Get all orders for an artisan
    @GetMapping("/artisan/{artisanId}/orders")
    public ResponseEntity<List<Order>> getArtisanOrders(
            @PathVariable Long artisanId,
            @RequestHeader("Authorization") String token) {

        Long artisanIdFromToken = jwtUtil.extractArtisanId(token.substring(7));

        if (!artisanId.equals(artisanIdFromToken)) {
            throw new RuntimeException("Unauthorized access");
        }

        List<Order> orders = orderRepository.findByItemsProductArtisanId(artisanId);
        return ResponseEntity.ok(orders);
    }

    // Get detailed order information for artisan
    @GetMapping("/artisan/{artisanId}/orders/{orderId}")
    public ResponseEntity<OrderDTO> getArtisanOrderDetails(
            @PathVariable Long artisanId,
            @PathVariable Long orderId,
            @RequestHeader("Authorization") String token) {

        Long artisanIdFromToken = jwtUtil.extractArtisanId(token.substring(7));

        if (!artisanId.equals(artisanIdFromToken)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Order order = orderRepository.findByIdWithItemsAndProductImages(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        boolean hasArtisanItems = order.getItems().stream()
                .anyMatch(item -> item.getProduct().getArtisan().getId().equals(artisanId));

        if (!hasArtisanItems) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return ResponseEntity.ok(new OrderDTO(order));
    }

    private User validateUser(Long userId, String token) {
        String email = jwtUtil.extractUsername(token.substring(7));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized access");
        }
        return user;
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleException(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
    }
}