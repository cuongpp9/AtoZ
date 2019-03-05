import { IS_CONNECTING, IS_END_CONNECT } from './types';

export function isConnecting() {
  return {
    type: IS_CONNECTING,
  };
}

export function isEndConnected() {
  return {
    type: IS_END_CONNECT,
  };
}
