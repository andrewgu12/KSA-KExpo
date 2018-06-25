import { Guest } from '../../models/guest';
import { Performance } from '../../models/performance';
import { expect } from 'chai';
import { saveABunchPerformances, saveABunchGuests } from '../library';

describe('Guest Model', () => {
  beforeEach(async () => {
    await saveABunchPerformances();
    await saveABunchGuests();
  });

  afterEach(async () => {
    await Performance.clearTable();
    await Guest.clearTable();
  });

  it('can register a new guest and change their name', async() => {
    const guest: Guest = new Guest('guest test');
    expect(guest.name).to.equal('guest test');

    const newName = 'billybob';
    guest.name = newName;
    expect(guest.name).to.equal(newName);
  });

  it('can save a guest properly', async () => {
    const guest: Guest = new Guest('guest test');
    await guest.save();
    const guestResult: boolean = await Guest.checkUsernameExists('guest test');
    expect(guestResult).to.be.true;
  });

  it('can delete a guest from the DB', async() => {
    const guest: Guest = new Guest('guest test');
    await guest.save();

    let guestResult: boolean = await Guest.checkUsernameExists('guest test');
    expect(guestResult).to.be.false;
    await guest.delete();
    guestResult = await Guest.checkUsernameExists('guest test');
    expect(guestResult).to.be.false;
  });

  it('can vote for a performance correctly', async() => {
    const ids: number[] = await Performance.returnAllIds();
    const guest: Guest = new Guest('guest test');
    expect(guest.voteCount(ids[0])).to.be.false;
    await guest.vote(ids[0]);
    expect(guest.voteCount(ids[0])).to.be.true;

    expect(guest.vote(-100000)).to.throw('Id doesn\'t exist!');
  });
});
