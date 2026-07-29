package com.gigconnect.dtos.payment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CreateOrderResponseDto {

    private String orderId;
    private Integer amount;
    private String currency;

}