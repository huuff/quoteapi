import { randomElement } from '@/random-element';

describe('randomElement', () => {
 it('returns an element in the array', () => {
    const testArray = [1, 5, 7];
    const random = randomElement(testArray);

    expect(testArray.includes(random));
 }); 
});
