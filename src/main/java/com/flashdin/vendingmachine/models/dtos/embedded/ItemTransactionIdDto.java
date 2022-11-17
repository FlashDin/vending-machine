package com.flashdin.vendingmachine.models.dtos.embedded;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class ItemTransactionIdDto implements Serializable {

    private String itemId;
    private String transactionId;

}
