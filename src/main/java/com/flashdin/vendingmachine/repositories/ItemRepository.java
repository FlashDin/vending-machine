package com.flashdin.vendingmachine.repositories;

import com.flashdin.vendingmachine.models.Item;
import com.flashdin.vendingmachine.repositories.base.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends CrudRepository<Item, String> {

}
