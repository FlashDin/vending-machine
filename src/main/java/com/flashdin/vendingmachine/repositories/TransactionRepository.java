package com.flashdin.vendingmachine.repositories;

import com.flashdin.vendingmachine.models.Transaction;
import com.flashdin.vendingmachine.repositories.base.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends CrudRepository<Transaction, String> {
    
}
