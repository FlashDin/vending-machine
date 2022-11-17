package com.flashdin.vendingmachine.models;

import com.flashdin.vendingmachine.models.base.BaseEntity;
import lombok.Data;

import javax.persistence.Entity;

@Entity
@Data
public class Item extends BaseEntity {

    private String name;
    private long price;
    private long stock;

}
