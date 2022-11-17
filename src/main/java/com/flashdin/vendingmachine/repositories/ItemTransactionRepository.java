package com.flashdin.vendingmachine.repositories;

import com.flashdin.vendingmachine.models.ItemTransaction;
import com.flashdin.vendingmachine.models.embedded.ItemTransactionId;
import com.flashdin.vendingmachine.repositories.base.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemTransactionRepository extends CrudRepository<ItemTransaction, ItemTransactionId> {

}
