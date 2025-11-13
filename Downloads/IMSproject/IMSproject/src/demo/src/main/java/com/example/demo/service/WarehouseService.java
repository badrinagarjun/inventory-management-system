package com.example.demo.service;

import com.example.demo.model.Warehouse;
import com.example.demo.repository.WarehouseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WarehouseService {

    @Autowired
    private final WarehouseRepo warehouseRepo;

    public WarehouseService(WarehouseRepo warehouseRepo) {
        this.warehouseRepo = warehouseRepo;
    }

    public List<Warehouse> getAllSales() {
        return warehouseRepo.findAll();
    }

    public Optional<Warehouse> getSaleById(Long orderNo) {
        return warehouseRepo.findById(orderNo);
    }

    public Warehouse saveSale(Warehouse warehouse) {
        return warehouseRepo.save(warehouse);
    }

    public void deleteSale(Long orderNo) {
        warehouseRepo.deleteById(orderNo);
   }
   
   
}