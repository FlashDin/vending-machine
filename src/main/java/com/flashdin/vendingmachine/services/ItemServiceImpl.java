package com.flashdin.vendingmachine.services;

import com.flashdin.vendingmachine.models.dtos.ItemDto;
import com.flashdin.vendingmachine.repositories.ItemRepository;
import com.flashdin.vendingmachine.services.base.CrudService;
import com.flashdin.vendingmachine.services.base.CrudServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ItemServiceImpl extends CrudServiceImpl<ItemServiceImpl> implements CrudService<ItemDto, String> {

    private final ItemRepository itemRepository;

    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public Page<ItemDto> findAll(ItemDto dto,
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
        return itemRepository.findAll(pageable)
                .map(new ItemDto()::toDto);
    }

    @Override
    public ItemDto save(ItemDto dto) {
        return new ItemDto().toDto(itemRepository.save(new ItemDto().toEntity(dto)));
    }

    @Override
    public List<ItemDto> saveAll(List<ItemDto> dto) {
        return itemRepository.saveAll(dto.stream()
                        .map(new ItemDto()::toEntity)
                        .collect(Collectors.toList()))
                .stream()
                .map(new ItemDto()::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<ItemDto> findById(String id) {
        return itemRepository.findById(id).map(new ItemDto()::toDto);
    }

    @Override
    public void delete(ItemDto dto) {
        itemRepository.delete(new ItemDto().toEntity(dto));
    }
}
