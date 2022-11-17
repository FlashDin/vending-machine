package com.flashdin.vendingmachine.models;

import com.flashdin.vendingmachine.models.embedded.ItemTransactionId;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class ItemTransaction {

    @EmbeddedId
    private ItemTransactionId itemTransactionId;
    private long itemTotal;
    private long itemPrice;

    @MapsId("itemId")
    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Item item;
    @MapsId("transactionId")
    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Transaction transaction;

}
