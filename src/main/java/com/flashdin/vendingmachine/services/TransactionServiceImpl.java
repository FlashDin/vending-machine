package com.flashdin.vendingmachine.services;

import com.flashdin.vendingmachine.helpers.AcceptedCurrency;
import com.flashdin.vendingmachine.models.Item;
import com.flashdin.vendingmachine.models.ItemTransaction;
import com.flashdin.vendingmachine.models.Transaction;
import com.flashdin.vendingmachine.models.dtos.ItemDto;
import com.flashdin.vendingmachine.models.dtos.ItemTransactionDto;
import com.flashdin.vendingmachine.models.dtos.TransactionDto;
import com.flashdin.vendingmachine.models.embedded.ItemTransactionId;
import com.flashdin.vendingmachine.repositories.ItemRepository;
import com.flashdin.vendingmachine.repositories.ItemTransactionRepository;
import com.flashdin.vendingmachine.repositories.TransactionRepository;
import com.flashdin.vendingmachine.services.base.CrudService;
import com.flashdin.vendingmachine.services.base.CrudServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@Transactional
public class TransactionServiceImpl extends CrudServiceImpl<TransactionServiceImpl> implements CrudService<TransactionDto, String> {

    private final TransactionRepository transactionRepository;
    private final ItemTransactionRepository transactionTransactionRepository;
    private final ItemRepository itemRepository;

    public TransactionServiceImpl(TransactionRepository transactionRepository, ItemTransactionRepository transactionTransactionRepository, ItemRepository itemRepository) {
        this.transactionRepository = transactionRepository;
        this.transactionTransactionRepository = transactionTransactionRepository;
        this.itemRepository = itemRepository;
    }

    @Override
    public Page<TransactionDto> findAll(TransactionDto dto,
                                        int page,
                                        int size,
                                        String sort,
                                        String direction) {
        Sort tSort = Sort.by(sort);
        if (direction == null || direction.equals("asc")) {
            tSort = tSort.ascending();
        } else {
            tSort = tSort.descending();
        }
        Pageable pageable = PageRequest.of(page, size, tSort);
        return transactionRepository.findAll(pageable)
                .map(new TransactionDto()::toDto);
    }

    @Override
    public TransactionDto save(TransactionDto dto) throws IllegalAccessException {
        if (!AcceptedCurrency.CURRENCY.contains(dto.getInPay())) {
            throw new IllegalAccessException("Your balance is not valid");
        }
        dto.setTransactionId("123456");
        long totalPayment = dto.getItems().stream().mapToLong(t -> t.getItemPrice() * t.getItemTotal()).sum();
        dto.setInReturn(dto.getInPay() - totalPayment);
        if (dto.getInReturn() < 0) {
            throw new IllegalAccessException("Your balance is not enough");
        }
        Specification<Item> itemSpecification = (root, query, criteriaBuilder) -> root.get("id").in(
                dto.getItems().stream()
                        .map(t -> t.getItem().getId())
                        .collect(Collectors.toList())
        );
        List<Item> items = itemRepository.findAll(itemSpecification);
        Transaction transaction = transactionRepository.save(new TransactionDto().toEntity(dto));
        List<ItemTransaction> itemTransactions = dto.getItems().stream().map(t -> {
                    ItemTransaction itemTransaction = new ItemTransactionDto()
                            .toEntity(t);
                    itemTransaction.setItemPrice(t.getItemPrice());
                    itemTransaction.setTransaction(transaction);
                    ItemTransactionId itemTransactionId = new ItemTransactionId();
                    itemTransactionId.setItemId(t.getItem().getId());
                    itemTransactionId.setTransactionId(itemTransaction.getTransaction().getId());
                    itemTransaction.setItemTransactionId(itemTransactionId);
                    itemTransaction.setItem(
                            items.stream().filter(t1 -> t1.getId().equals(t.getItem().getId()))
                                    .map(t1 -> {
                                        long newStock = t1.getStock() - t.getItemTotal();
                                        if (newStock < 0) {
                                            throw new RuntimeException("Stock is not enough");
                                        }
                                        t1.setStock(newStock);
                                        return t1;
                                    })
                                    .findFirst()
                                    .orElse(null)
                    );
                    return itemTransaction;
                })
                .collect(Collectors.toList());
        dto.toDto(transaction);
        dto.setItems(transactionTransactionRepository.saveAll(itemTransactions).stream()
                .map(t -> new ItemTransactionDto().toDto(t))
                .collect(Collectors.toList()));
        return dto;
    }

    @Override
    public List<TransactionDto> saveAll(List<TransactionDto> dto) {
        return transactionRepository.saveAll(dto.stream()
                        .map(new TransactionDto()::toEntity)
                        .collect(Collectors.toList()))
                .stream()
                .map(new TransactionDto()::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<TransactionDto> findById(String id) {
        return transactionRepository.findById(id).map(new TransactionDto()::toDto);
    }

    @Override
    public void delete(TransactionDto dto) {
        transactionRepository.delete(new TransactionDto().toEntity(dto));
    }

}
