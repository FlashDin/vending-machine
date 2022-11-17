package com.flashdin.vendingmachine.models.dtos;

import com.flashdin.vendingmachine.models.Transaction;
import com.flashdin.vendingmachine.models.base.BaseDto;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.util.List;

@Data
public class TransactionDto extends BaseDto<Transaction, TransactionDto> {

    private String transactionId;
    private long inPay;
    private long inReturn;
    private List<ItemTransactionDto> items;

    @Override
    public Transaction toEntity(TransactionDto dto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(dto, Transaction.class);
    }

    @Override
    public TransactionDto toDto(Transaction entity) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(entity, TransactionDto.class);
    }
}
