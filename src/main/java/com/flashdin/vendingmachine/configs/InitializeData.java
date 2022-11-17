package com.flashdin.vendingmachine.configs;

import com.flashdin.vendingmachine.models.Item;
import com.flashdin.vendingmachine.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class InitializeData {

    @Autowired
    private ItemRepository itemRepository;

    @EventListener(ApplicationReadyEvent.class)
    public void updateSeed() {
        this.seedItemTable();
    }

    private void seedItemTable() {
        Optional<Item> itemOptional = itemRepository.findAll().stream().findFirst();
        if (!itemOptional.isPresent()) {
            new Thread(() -> {
                List<Item> items = new ArrayList<>();
                Item item = new Item();
                item.setName("Biskuit");
                item.setStock(10);
                item.setPrice(6000);
                items.add(item);
                item = new Item();
                item.setName("Chips");
                item.setStock(10);
                item.setPrice(8000);
                items.add(item);
                item = new Item();
                item.setName("Oreo");
                item.setStock(10);
                item.setPrice(10000);
                items.add(item);
                item = new Item();
                item.setName("Tango");
                item.setStock(10);
                item.setPrice(12000);
                items.add(item);
                item = new Item();
                item.setName("Cokelat");
                item.setStock(10);
                item.setPrice(15000);
                items.add(item);
                itemRepository.saveAll(items);
            }).start();
        }
    }

}
