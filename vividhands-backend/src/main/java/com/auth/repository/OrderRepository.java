package com.auth.repository;

import com.auth.model.Order;
import com.auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    Optional<Order> findByRazorpayOrderId(String razorpayOrderId);

    List<Order> findByUserAndRazorpayPaymentIdIsNotNull(User user);

    @Query("SELECT o FROM Order o LEFT JOIN FETCH o.items WHERE o.id = ?1")
    Optional<Order> findByIdWithItems(Long orderId);



    @Query("SELECT o FROM Order o WHERE o.orderDate BETWEEN ?1 AND ?2 AND o.user = ?3")
    List<Order> findByOrderDateBetweenAndUser(LocalDateTime start, LocalDateTime end, User user);

//    // OrderRepository.java - Update query to fetch product images
//    @Query("SELECT o FROM Order o " +
//            "LEFT JOIN FETCH o.items i " +
//            "LEFT JOIN FETCH i.product p " +
//            "LEFT JOIN FETCH p.images " +
//            "WHERE o.user = :user AND o.razorpayPaymentId IS NOT NULL")
//    List<Order> findByUserAndRazorpayPaymentIdIsNotNull(@Param("user") User user);



    @Query("SELECT DISTINCT o FROM Order o " +
            "LEFT JOIN FETCH o.items i " +
            "LEFT JOIN FETCH i.product p " +
            "LEFT JOIN FETCH o.user u " +
            "WHERE p.artisan.id = :artisanId " +
            "AND o.razorpayPaymentId IS NOT NULL")
    List<Order> findByItemsProductArtisanId(@Param("artisanId") Long artisanId);

    // OrderRepository.java - Add this method
    @Query("SELECT o FROM Order o " +
            "LEFT JOIN FETCH o.items i " +
            "LEFT JOIN FETCH i.product p " +
            "LEFT JOIN FETCH p.images " +
            "WHERE o.id = ?1")
    Optional<Order> findByIdWithItemsAndProductImages(Long orderId);




}