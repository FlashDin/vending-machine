package com.flashdin.vendingmachine.models.base;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
public class MessageDto implements Serializable {

    private HttpStatus status;
    private String message;
    private Object meta;

}
