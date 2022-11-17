package com.flashdin.vendingmachine.models;

import com.flashdin.vendingmachine.models.base.BaseEntity;
import lombok.Data;

import javax.persistence.Entity;

@Entity
@Data
public class Transaction extends BaseEntity {

    private String transactionId;
    private long inPay;
    private long inReturn;
}
