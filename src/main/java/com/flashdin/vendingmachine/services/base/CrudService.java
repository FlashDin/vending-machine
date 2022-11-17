package com.flashdin.vendingmachine.services.base;

import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface CrudService<D, ID> {

    Page<D> findAll(D dto, int page, int size, String sort, String direction);

    D save(D dto) throws IllegalAccessException;

    List<D> saveAll(List<D> dto);

    Optional<D> findById(ID id);

    void delete(D dto);
}
