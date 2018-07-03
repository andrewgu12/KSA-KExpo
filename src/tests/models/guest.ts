import { Guest } from '../../models/guest';
import { Performance } from '../../models/performance';
import { expect } from 'chai';
import { saveABunchPerformances, saveABunchGuests } from '../library';
import { generateRandomString } from '../../helpers/generate-random-string';

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
    const guest: Guest = new Guest('guest test', generateRandomString(40));
    expect(guest.name).to.equal('guest test');

    const newName = 'billybob';
    guest.name = newName;
    expect(guest.name).to.equal(newName);
  });

  it('can save a guest properly', async () => {
    const guest: Guest = new Guest('guest test', generateRandomString(40));
    await guest.save();
    const guestResult: Guest = await Guest.findOne('guest test');
    expect(guestResult).to.not.be.empty;
  });

  it('can delete a guest from the DB', async() => {
    const guest: Guest = new Guest('guest test', generateRandomString(40));
    await guest.save();

    let guestResult: Guest = await Guest.findOne('guest test');
    expect(guestResult).to.not.be.empty;
    await guest.delete();
    guestResult = await Guest.findOne('guest test');
    expect(guestResult).to.be.null;
  });

  it.only('can vote for a performance correctly', async() => {
    const ids :   number[] = await Performance.returnAllIds();
    const guest : Guest    = new Guest('guest test', generateRandomString(40));
    expect(guest.voteCount(ids[0])).to.be.false;
    console.log(ids);
    await guest.vote(ids[0]);
    expect(guest.voteCount(ids[0])).to.be.true;

    expect(guest.vote(-100000)).to.be.false;
  });
});
