package com.flashdin.vendingmachine.controllers.base;

import com.flashdin.vendingmachine.services.base.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public abstract class CrudController<S extends CrudService, D, ID> {

    protected S abstractCrudService;

    public CrudController(S service) {
        this.abstractCrudService = service;
    }

    @GetMapping("")
    public ResponseEntity<Object> findAll(@RequestParam(required = false) D dto,
                                          @RequestParam(required = false, defaultValue = "0") int page,
                                          @RequestParam(required = false, defaultValue = "10") int size,
                                          @RequestParam(required = false, defaultValue = "id") String sort,
                                          @RequestParam(required = false, defaultValue = "asc") String direction) {
        return ResponseEntity.ok(abstractCrudService.findAll(dto, page, size, sort, direction));
    }

    @PostMapping
    public ResponseEntity<Object> save(@RequestBody D dto) throws IllegalAccessException {
        return ResponseEntity.ok(abstractCrudService.save(dto));
    }

    @PostMapping("/all")
    public ResponseEntity<Object> saveAll(@RequestBody List<D> dto) {
        return ResponseEntity.ok(abstractCrudService.saveAll(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findById(@PathVariable ID id) {
        return ResponseEntity.ok(abstractCrudService.findById((ID) id.toString()));
    }

    @DeleteMapping
    public void delete(D dto) {
        abstractCrudService.delete(dto);
    }

}