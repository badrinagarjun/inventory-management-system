package com.example.demo.controller;

import com.example.demo.model.Warehouse;
import com.example.demo.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/warehouse")
public class WarehouseController {

    @Autowired
    private final WarehouseService warehouseService;

    public WarehouseController(WarehouseService warehouseService) {
        this.warehouseService = warehouseService;
    }

    @GetMapping
    public List<Warehouse> getAllSales() {
        return warehouseService.getAllSales();
    }

    @GetMapping("/{orderNo}")
    public ResponseEntity<Warehouse> getSaleById(@PathVariable Long orderNo) {
        Optional<Warehouse> warehouse = warehouseService.getSaleById(orderNo);
        return warehouse.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Warehouse> createSale(@RequestBody Warehouse warehouse) {
        // Set default or random shipment status
        warehouse.setShipmentStatus("Pending"); // Example default status
        Warehouse savedWarehouse = warehouseService.saveSale(warehouse);
        return ResponseEntity.ok(savedWarehouse);
    }

    @DeleteMapping("/{orderNo}")
    public ResponseEntity<Void> deleteSale(@PathVariable Long orderNo) {
        warehouseService.deleteSale(orderNo);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{orderNo}")
public ResponseEntity<Warehouse> updateShipmentStatus(@PathVariable Long orderNo, @RequestBody Warehouse updatedWarehouse) {
    Optional<Warehouse> warehouseOpt = warehouseService.getSaleById(orderNo);
    if (warehouseOpt.isPresent()) {
        Warehouse warehouse = warehouseOpt.get();
        warehouse.setShipmentStatus(updatedWarehouse.getShipmentStatus());
        Warehouse savedWarehouse = warehouseService.saveSale(warehouse);
        return ResponseEntity.ok(savedWarehouse);
    } else {
        return ResponseEntity.notFound().build();
    }
}

}