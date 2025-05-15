export const GFE_PREFIX = 'gfe';
export const JAVASCRIPT_TYPE = 'javascript';
export const USER_INTERFACE_TYPE = 'user-interface';

export const JAVASCRIPT_KEY_PATTERN = new RegExp(
  `^${GFE_PREFIX}:${JAVASCRIPT_TYPE}:([^:]+)(?::ts)?$`,
);
export const USER_INTERFACE_KEY_PATTERN = new RegExp(
  `^${GFE_PREFIX}:${USER_INTERFACE_TYPE}:([^:]+):([^:]+)$`,
);
