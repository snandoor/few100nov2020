describe('functions', () => {

    describe('parameters and overloading etc.', () => {

        describe('higher-ordered functions', () => {
            // a function that takes one or more functions as arguments, or returns a function is a HOF
            it('making a tagmaker function', () => {

                function tagMaker(element: string, content: string): string {
                    return `<${element}>${content}</${element}>`;
                }

                expect(tagMaker('h1', 'Hello')).toBe('<h1>Hello</h1>');
                expect(tagMaker('h1', 'Goodbye')).toBe('<h1>Goodbye</h1>');
                expect(tagMaker('p', 'Body')).toBe('<p>Body</p>');
            });
            it('an OOP example', () => {
                class TagMaker {
                    constructor(private element: string) { }

                    make(content: string): string {
                        return `<${this.element}>${content}</${this.element}>`;
                    }
                }

                const h1Maker = new TagMaker('h1');
                const pMaker = new TagMaker('p');
                expect(h1Maker.make('Hello')).toBe('<h1>Hello</h1>');
                expect(h1Maker.make('Goodbye')).toBe('<h1>Goodbye</h1>');
                expect(pMaker.make('Body')).toBe('<p>Body</p>');
            });

            it('a functional programmer approach', () => {

                function tagMaker(element: string): (content: string) => string {
                    return (c) => `<${element}>${c}</${element}>`
                }

                const h1Maker = tagMaker('h1');
                const pMaker = tagMaker('p');

                expect(h1Maker('Hello')).toBe('<h1>Hello</h1>');
                expect(h1Maker('Goodbye')).toBe('<h1>Goodbye</h1>');
                expect(pMaker('Body')).toBe('<p>Body</p>');
            });

        });
        it('destructuring arguments', () => {

            let seatType: 'WINDOW' | 'AISLE' | 'MIDDLE';



            interface HttpStuff { method: 'GET' | 'POST' | 'PUT' | 'DELETE', format: string }
            function doApiCall(url: string, { method, format }: HttpStuff): void {
                console.log(`Making a request to ${url} using ${method} and format ${format}`);
            }

            // function doApiCall(url: string, http: HttpStuff): void {
            //     console.log(`Making a request to ${url} using ${http.method} and format ${http.format}`);
            // }

            doApiCall('/books', { method: 'GET', format: 'application/json' });

        });
        it('default values for functions', () => {
            function add(a: number = 2, b: number = 10, ...rest: number[]) {
                const firstTwo = a + b;
                return rest.reduce((lhs, rhs) => rhs + lhs, firstTwo);
            }
            expect(add(2, 2)).toBe(4);
            expect(add(10)).toBe(20);
            expect(add()).toBe(12);
            expect(add(undefined, 8)).toBe(10);
            expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);

        });
        describe('spread operator', () => {

            it('spreading on arrays', () => {
                const starter = [1, 2, 3, 4, 5];
                const newArray = [0, ...starter, 6, 7, 8, 9];
                expect(newArray).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
                expect(starter).toEqual([1, 2, 3, 4, 5]);
            });
            it('spreading on objects', () => {
                const movie = {
                    title: 'Wild at Heart',
                    director: 'Lynch',
                    yearReleased: 2005
                }

                const movie2 = { ...movie, mpaaRating: 'R' };
                expect(movie2).toEqual({
                    title: 'Wild at Heart',
                    director: 'Lynch',
                    yearReleased: 2005,
                    mpaaRating: 'R'
                });
                expect(movie).toEqual({
                    title: 'Wild at Heart',
                    director: 'Lynch',
                    yearReleased: 2005
                });


            });
        });
        it('you cannot overload', () => {


            function formatName(first: string, last: string, mi?: string): string {
                if (mi) {
                    return `${last}, ${first} ${mi}.`;
                } else {
                    return `${last}, ${first}`
                }
            }

            expect(formatName('Han', 'Solo')).toBe('Solo, Han');
            expect(formatName('Han', 'Solo', 'D')).toBe('Solo, Han D.');
        });
        it('falsy and truthy', () => {
            expect(undefined).toBeFalsy();
            expect(null).toBeFalsy();
            expect(0).toBeFalsy();
            expect(1).toBeTruthy();
            expect(-1).toBeTruthy();
            expect('').toBeFalsy();
            expect(' ').toBeTruthy();
            const numbers = [1, 2, 3];
            expect(numbers).toBeTruthy();
            expect(numbers[0]).toBeTruthy();
            expect(numbers[99]).toBeFalsy(); // because it is undefined.
        });
        it('null coalescing stuff', () => {

            const answer = null || false || 0 || undefined || '' || 'tacos';
            expect(answer).toBe('tacos');

            interface Person {
                name: string;
                age: number;
                job?: {
                    title: string;
                    salary: number
                }
            }

            const bob: Person = {
                name: 'Robert',
                age: 52,
                // job: {
                //     title: 'CEO',
                //     salary: 32_000
                // }
            };

            const name = bob.name;
            const pay = bob.job?.salary;

        });

    });
});

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}