import { EventEmitter } from 'events';

export const eventBus = new EventEmitter();

eventBus.on('user.created', (user) => {
  console.log('[Event] user.created ->', user.email);
});
