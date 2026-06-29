package com.accenture.ra.model;

import java.util.List;

public record TicketPayload(
        Tag tag,
        String indirizzoIp,
        String hostName,
        String dataTicket,
        String telefono,
        String indirizzoSede,
        String message,
        TagLayer2 tagLayer2,
        Object gruppoAssegnatario, // Use Object or String if it can be null
        List<Object> allegati       // Array matching the "allegati": [] in JSON
) {}