// package com.example.demo.service;

// import com.example.demo.model.Items;
// import com.example.demo.repository.ItemsRepo;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.Optional;

// @Service
// public class ItemsService {

//     @Autowired
//     private ItemsRepo itemsRepo;

//     public Items saveItem(Items item) {
//         return itemsRepo.save(item);
//     }

//     public List<Items> getAllItems() {
//         return itemsRepo.findAll();
//     }

//     public Optional<Items> getItemById(Long id) {
//         return itemsRepo.findById(id);
//     }

//     public void deleteItem(Long id) {
//         itemsRepo.deleteById(id);
//     }
//     public List<Items> getItemsByGroup(String groupName) {
//         return itemsRepo.findByGroupName(groupName); // Implement this method in ItemsRepo
//     }

    
// }
package com.example.demo.service;

import com.example.demo.model.Items;
import com.example.demo.repository.ItemsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemsService {

    @Autowired
    private ItemsRepo itemsRepo;

    public Items saveItem(Items item) {
        return itemsRepo.save(item);
    }

    public List<Items> getAllItems() {
        return itemsRepo.findAll();
    }

    public Optional<Items> getItemById(Long id) {
        return itemsRepo.findById(id);
    }

    public void deleteItem(Long id) {
        itemsRepo.deleteById(id);
    }

    public long getItemCount() {
        return itemsRepo.count();
    }
    
    public List<Items> getItemsByGroup(String groupName) {
        return itemsRepo.findByGroupName(groupName);
    }

    public long getLowStockItemsCount() {
        return itemsRepo.countByProductSKULessThanEqual(10);
    }
    
    public void deleteItemsByGroup(String groupName) {
        List<Items> items = getItemsByGroup(groupName);
        for (Items item : items) {
            deleteItem(item.getId());
        }
    }
}
