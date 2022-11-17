package com.flashdin.vendingmachine.models.embedded;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
public class ItemTransactionId implements Serializable {

    private String itemId;
    private String transactionId;

}
