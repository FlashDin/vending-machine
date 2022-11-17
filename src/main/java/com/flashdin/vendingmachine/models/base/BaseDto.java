package com.flashdin.vendingmachine.models.base;

import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;
import java.util.Date;

public class BaseDto<T, D> implements Serializable {

    @Getter
    @Setter
    private String id;
    @Getter
    @Setter
    private Date createdAt;
    @Getter
    @Setter
    private Date updatedAt;

    public T toEntity(D dto) {
        return null;
    }

    public D toDto(T entity) {
        return null;
    }

}
