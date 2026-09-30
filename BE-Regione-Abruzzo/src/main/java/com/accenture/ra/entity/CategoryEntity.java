package com.accenture.ra.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(name = "category")
@SQLDelete(sql = "UPDATE category SET deleted = true WHERE id=?")
@SQLRestriction("deleted = false")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "categoria", nullable = false, length = 255)
    private String categoria;
    @Column(name = "deleted", nullable = false)
    @Builder.Default
    private boolean deleted = false;

}
