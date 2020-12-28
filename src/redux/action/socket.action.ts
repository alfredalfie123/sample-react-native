export function connectSocket() {
  return {
     type: 'CONNECT'
  }
}

export function disconnectSocket() {
  return {
     type: 'DISCONNECT'
  }
}