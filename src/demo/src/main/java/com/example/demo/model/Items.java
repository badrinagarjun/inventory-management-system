// package com.example.demo.model;
 

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import lombok.AllArgsConstructor;
// import lombok.Getter;
// import lombok.NoArgsConstructor;
// import lombok.Setter;
 
// @Entity
// @Setter
// @Getter
// @NoArgsConstructor
// @AllArgsConstructor
// public class Items {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private long id;
//     private String productName;
//     private Integer productSKU;
//     private double price;
//     private String description;
// }

package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Items {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String productName;
    private Integer productSKU;
    private double price;
    private String description;
    private String groupName;
}
