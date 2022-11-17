package com.flashdin.vendingmachine.models.dtos;

import com.flashdin.vendingmachine.models.Item;
import com.flashdin.vendingmachine.models.base.BaseDto;
import lombok.Data;
import org.modelmapper.ModelMapper;

@Data
public class ItemDto extends BaseDto<Item, ItemDto> {

    private String name;
    private long price;
    private long stock;

    @Override
    public Item toEntity(ItemDto dto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(dto, Item.class);
    }

    @Override
    public ItemDto toDto(Item entity) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(entity, ItemDto.class);
    }
}
