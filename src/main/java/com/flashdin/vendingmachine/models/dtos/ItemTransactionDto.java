package com.flashdin.vendingmachine.models.dtos;

import com.flashdin.vendingmachine.models.Item;
import com.flashdin.vendingmachine.models.ItemTransaction;
import com.flashdin.vendingmachine.models.Transaction;
import lombok.Data;
import org.modelmapper.ModelMapper;
import org.springframework.util.ObjectUtils;

@Data
public class ItemTransactionDto {

    private ItemTransactionDto itemTransaction;
    private long itemTotal;
    private long itemPrice;
    private ItemDto item;
    private TransactionDto transaction;

    public ItemTransaction toEntity(ItemTransactionDto dto) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setAmbiguityIgnored(true);
        ItemTransaction it = modelMapper.map(dto, ItemTransaction.class);
        if (!ObjectUtils.isEmpty(dto.getItem())) {
            Item t = modelMapper.map(dto.getItem(), Item.class);
            it.setItem(t);
        }
        if (!ObjectUtils.isEmpty(dto.getTransaction())) {
            Transaction t = modelMapper.map(dto.getTransaction(), Transaction.class);
            it.setTransaction(t);
        }
        return it;
    }

    public ItemTransactionDto toDto(ItemTransaction entity) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setAmbiguityIgnored(true);
        ItemTransactionDto it = modelMapper.map(entity, ItemTransactionDto.class);
        if (!ObjectUtils.isEmpty(entity.getItem())) {
            ItemDto t = new ItemDto().toDto(entity.getItem());
            it.setItem(t);
        }
        if (!ObjectUtils.isEmpty(entity.getTransaction())) {
            TransactionDto t = new TransactionDto().toDto(entity.getTransaction());
            it.setTransaction(t);
        }
        return it;
    }

}
