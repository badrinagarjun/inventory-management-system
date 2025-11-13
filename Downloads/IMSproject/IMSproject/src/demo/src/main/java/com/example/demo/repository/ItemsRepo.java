// package com.example.demo.repository;
 
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;
 
// import com.example.demo.model.Items;
// import java.util.List;

 
// @Repository
// public interface ItemsRepo extends JpaRepository<Items,Long>{
//       List<Items> findByGroupName(String groupName);
// }

package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.model.Items;

import java.util.List;

@Repository
public interface ItemsRepo extends JpaRepository<Items, Long> {
    List<Items> findByGroupName(String groupName);
    void deleteByGroupName(String groupName);
    long countByProductSKULessThanEqual(int sku);
}
