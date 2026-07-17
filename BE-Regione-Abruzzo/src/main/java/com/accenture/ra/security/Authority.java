package com.accenture.ra.security;

public enum Authority {
    PROJECT_CREATE(Fields.PROJECT_CREATE),
    REQUEST_CREATE(Fields.REQUEST_CREATE),
    DATA_VIEW(Fields.DATA_VIEW),
    USER_READ(Fields.USER_READ),
    USER_WRITE(Fields.USER_WRITE);

    private final String value;

    Authority(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    /**
     * Inner class containing constant String values.
     * This lets us reference them inside @PreAuthorize without messy SpEL code!
     */
    public static class Fields {
        public static final String PROJECT_CREATE = "project:create";
        public static final String REQUEST_CREATE = "request:create";
        public static final String DATA_VIEW = "data:view";
        public static final String USER_READ = "user:read";
        public static final String USER_WRITE = "user:write";
    }
}