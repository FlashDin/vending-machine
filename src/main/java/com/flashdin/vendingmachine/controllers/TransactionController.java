package com.flashdin.vendingmachine.controllers;

import com.flashdin.vendingmachine.controllers.base.CrudController;
import com.flashdin.vendingmachine.models.dtos.TransactionDto;
import com.flashdin.vendingmachine.services.TransactionServiceImpl;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/transaction")
public class TransactionController extends CrudController<TransactionServiceImpl, TransactionDto, String> {

    public TransactionController(TransactionServiceImpl service) {
        super(service);
    }
}
