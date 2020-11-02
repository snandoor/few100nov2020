

describe('writing specs in typescript', () => {
    it('is easy', () => {
        expect(true).toBe(true);
    });
    it('can add two integers', () => {
        const a = 10, b = 20;

        const answer = a + b;

        expect(answer).toBe(30);
    });
});

describe('using jasmine', () => {

    it('is pretty easy', () => {
        const favoriteColors = ['red', 'green'];
        const yourFavoriteColors = favoriteColors;

        expect(yourFavoriteColors).toBe(favoriteColors);

        expect(favoriteColors).toEqual(['red', 'green']);
        expect(12).toBe(12);
    });
});