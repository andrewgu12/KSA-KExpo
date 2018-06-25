import { Performance } from '../models/performance';
import { Guest } from '../models/guest';

// Generates a bunch of performances for testing
export const saveABunchPerformances = async () => {
  let perfPromise: Performance = null;
  for (let i = 0; i < 10; i++) {
    perfPromise = new Performance(`performance ${i}`);
    await perfPromise.save();
  }
};

// Generates a bunch of audiece members for testing
export const saveABunchGuests = async () => {
  let guestPromise: Guest = null;
  for (let i = 0; i < 100; i++) {
    guestPromise = new Guest(`guest ${i}`);
    await guestPromise.save();
  }
};
