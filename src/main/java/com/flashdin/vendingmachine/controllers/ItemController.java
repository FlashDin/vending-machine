package com.flashdin.vendingmachine.controllers;

import com.flashdin.vendingmachine.controllers.base.CrudController;
import com.flashdin.vendingmachine.models.dtos.ItemDto;
import com.flashdin.vendingmachine.services.ItemServiceImpl;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/item")
public class ItemController extends CrudController<ItemServiceImpl, ItemDto, String> {

    public ItemController(ItemServiceImpl service) {
        super(service);
    }
}
