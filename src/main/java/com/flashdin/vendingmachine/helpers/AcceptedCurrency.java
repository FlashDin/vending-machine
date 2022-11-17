package com.flashdin.vendingmachine.helpers;

import java.util.ArrayList;
import java.util.List;

public class AcceptedCurrency {

    public static final List<Long> CURRENCY = new ArrayList<>() {{
        add(2000L);
        add(5000L);
        add(10000L);
        add(20000L);
        add(50000L);
    }};

}
