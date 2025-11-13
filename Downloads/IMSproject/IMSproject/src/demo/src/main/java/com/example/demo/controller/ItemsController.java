package com.example.demo.controller;

import com.example.demo.model.Items;
import com.example.demo.service.ItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/items")
public class ItemsController {

    @Autowired
    private ItemsService itemsService;

    @PostMapping
    public ResponseEntity<Items> createItem(@RequestBody Items item) {
        Items savedItem = itemsService.saveItem(item);
        return ResponseEntity.ok(savedItem);
    }

    @GetMapping("/count")
public ResponseEntity<Long> getItemCount() {
    long count = itemsService.getItemCount();
    return ResponseEntity.ok(count);
}

@GetMapping("/low-stock-count")
public ResponseEntity<Long> getLowStockItemsCount() {
    long lowStockCount = itemsService.getLowStockItemsCount();
    return ResponseEntity.ok(lowStockCount);
}

    @GetMapping
    public ResponseEntity<List<Items>> getAllItems() {
        List<Items> items = itemsService.getAllItems();
        return ResponseEntity.ok(items);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Items> getItemById(@PathVariable Long id) {
        Optional<Items> item = itemsService.getItemById(id);
        return item.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/by-group")
    public ResponseEntity<List<Items>> getItemsByGroup(@RequestParam String groupName) {
        List<Items> items = itemsService.getItemsByGroup(groupName);
        return ResponseEntity.ok(items);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Items> updateItem(@PathVariable Long id, @RequestBody Items updatedItem) {
        Optional<Items> existingItem = itemsService.getItemById(id);
        if (existingItem.isPresent()) {
            Items item = existingItem.get();
            item.setProductName(updatedItem.getProductName());
            item.setProductSKU(updatedItem.getProductSKU());
            item.setPrice(updatedItem.getPrice());
            item.setDescription(updatedItem.getDescription());
            Items savedItem = itemsService.saveItem(item);
            return ResponseEntity.ok(savedItem);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/by-group")
    public ResponseEntity<Void> deleteItemsByGroup(@RequestParam String groupName) {
        itemsService.deleteItemsByGroup(groupName);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemsService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }
}
