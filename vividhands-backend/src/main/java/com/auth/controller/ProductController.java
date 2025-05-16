package com.auth.controller;

import com.auth.dto.ProductDTO;
import com.auth.dto.ProductRequest;
import com.auth.dto.ReviewDTO;
import com.auth.model.Artisan;
import com.auth.model.Product;
import com.auth.repository.ArtisanRepository;
import com.auth.repository.ProductRepository;
import com.auth.service.ProductServiceImpl;
import com.auth.service.ReviewServiceImpl;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private static final Logger log = LoggerFactory.getLogger(ProductController.class);

    private final ProductServiceImpl productServiceImpl;
    private final ArtisanRepository artisanRepository;
    private final ProductRepository productRepository;
    private final ReviewServiceImpl reviewService;

    public ProductController(ProductServiceImpl productServiceImpl,
                             ArtisanRepository artisanRepository,
                             ProductRepository productRepository,
                             ReviewServiceImpl reviewService) {
        this.productServiceImpl = productServiceImpl;
        this.artisanRepository = artisanRepository;
        this.productRepository = productRepository;
        this.reviewService = reviewService;
    }

    // Add new product
    @PostMapping("/add")
    public ResponseEntity<ProductDTO> addProduct(
            @ModelAttribute ProductRequest request,
            Authentication authentication) throws IOException {
        log.debug("Adding new product for authenticated user");
        Artisan artisan = getAuthenticatedArtisan(authentication);
        Product product = new Product();
        copyRequestToProduct(request, product);
        product.setArtisan(artisan);
        Product savedProduct = productServiceImpl.addProduct(product, request.getImages());
        log.info("Product added successfully with ID: {}", savedProduct.getId());
        return ResponseEntity.ok(new ProductDTO(savedProduct));
    }

    // Get product reviews
    @GetMapping("/{productId}/reviews")
    public ResponseEntity<List<ReviewDTO>> getProductReviews(
            @PathVariable Long productId) {
        return ResponseEntity.ok(reviewService.getProductReviews(productId));
    }

    // Get artisan's own products
    @GetMapping("/my-products")
    public ResponseEntity<List<ProductDTO>> getArtisanProducts(Authentication authentication) {
        Artisan artisan = getAuthenticatedArtisan(authentication);
        log.debug("Fetching products for artisan ID: {}", artisan.getId());

        List<Product> products = productRepository.findByArtisanId(artisan.getId());
        log.debug("Found {} products for artisan ID: {}", products.size(), artisan.getId());

        return ResponseEntity.ok(products.stream()
                .map(ProductDTO::new)
                .collect(Collectors.toList()));
    }

    // Get single product by ID
    @Transactional
    @GetMapping("/{productId}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long productId) {
        log.debug("Fetching product with ID: {}", productId);
        Product product = productRepository.findByIdWithImages(productId)
                .orElseThrow(() -> {
                    log.error("Product not found with ID: {}", productId);
                    return new RuntimeException("Product not found");
                });
        return ResponseEntity.ok(new ProductDTO(product));
    }

    // Updated update product method
    @PutMapping("/update/{productId}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable Long productId,
            @ModelAttribute ProductRequest request,
            Authentication authentication) throws IOException {
        log.debug("Updating product with ID: {}", productId);
        Product existingProduct = getProductIfOwned(productId, authentication);
        copyRequestToProduct(request, existingProduct);

        Product updatedProduct = productServiceImpl.updateProduct(
                productId,
                existingProduct,
                request.getImages()
        );

        log.info("Product updated successfully with ID: {}", productId);
        return ResponseEntity.ok(new ProductDTO(updatedProduct));
    }

    // Delete product
    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<?> deleteProduct(
            @PathVariable Long productId,
            Authentication authentication) {
        log.debug("Attempting to delete product with ID: {}", productId);
        Product product = getProductIfOwned(productId, authentication);
        productServiceImpl.deleteProduct(product.getId());
        log.info("Product deleted successfully with ID: {}", productId);
        return ResponseEntity.ok().build();
    }

    // Get all products
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        log.debug("Fetching all products");
        List<Product> products = productRepository.findAllWithArtisanAndImages();
        log.debug("Found {} total products", products.size());
        return ResponseEntity.ok(products.stream()
                .map(ProductDTO::new)
                .collect(Collectors.toList()));
    }

    // Helper: Ensure product belongs to authenticated artisan
    private Product getProductIfOwned(Long productId, Authentication authentication) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> {
                    log.error("Product not found with ID: {}", productId);
                    return new RuntimeException("Product not found");
                });
        Artisan artisan = getAuthenticatedArtisan(authentication);
        if (!product.getArtisan().getId().equals(artisan.getId())) {
            log.warn("Unauthorized access attempt for product ID: {} by artisan ID: {}",
                    productId, artisan.getId());
            throw new RuntimeException("Forbidden");
        }
        return product;
    }

    // Helper: Copy request data to product entity
    private void copyRequestToProduct(ProductRequest request, Product product) {
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setCategory(request.getCategory());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setMaterials(request.getMaterials());
        product.setEthicalScore(request.getEthicalScore());
    }

    // Helper: Get authenticated artisan
    private Artisan getAuthenticatedArtisan(Authentication authentication) {
        return artisanRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> {
                    log.error("Artisan not found with email: {}", authentication.getName());
                    return new RuntimeException("Artisan not found");
                });
    }

    // Error handler
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeExceptions(RuntimeException ex) {
        log.error("Runtime exception occurred: {}", ex.getMessage(), ex);
        Map<String, String> errorResponse = new HashMap<>();

        if ("Product not found".equals(ex.getMessage())) {
            errorResponse.put("error", ex.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } else if ("Forbidden".equals(ex.getMessage())) {
            errorResponse.put("error", ex.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
        }

        errorResponse.put("error", "An error occurred");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }

    @GetMapping("/products/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productServiceImpl.getProductWithImages(id);
    }
}