import { generateRandomString } from '../../helpers/generate-random-string';
import { expect } from 'chai';

describe('Random String Helper', () => {
  it ('returns a blank string for no length', () => {
    expect(generateRandomString(0)).to.have.length(0);
  });

  it ('returns a string of length 40', () => {
    expect(generateRandomString(40)).to.have.length(40);
  });

  it ('returns a string of length 100', () => {
    expect(generateRandomString(100)).to.have.length(100);
  });
});
