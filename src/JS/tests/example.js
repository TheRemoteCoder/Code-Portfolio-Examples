import ExampleLib from '...';

const terms = {
  Avocado: ['Brown', 'Lime', 'Green'],
  apple: ['Red', 'Yellow'],
  applesin: ['Orange'],
  Apricot: ['Orange', 'Pink', 'Red'],
  水果沙拉: ['苹果', '草莓'], // Fruit salad [Apple, Strawberry]
  '': [''],
};

const instance = new ExampleLib(terms);

describe('Example - Text search', () => {
  test('4 terms of 2 results with combined terms, lowercase', () => {
    const result = instance.getText('app');

    expect(result).toStrictEqual(['Orange', 'Red', 'Yellow']);
  });

  test('3 terms of 1 result with sanitized input', () => {
    const result = instance.getText(' Avoc ');

    expect(result).toStrictEqual(['Brown', 'Green', 'Lime']);
  });

  test('1 term of 1 result with multibyte', () => {
    const result = instance.getText('水果沙拉');

    expect(result).toStrictEqual(['苹果', '草莓']);
  });
});

describe('Word search - Expect no results', () => {
  test('no results for single letter', () => {
    const result = instance.getText('A');

    expect(result).toStrictEqual([]);
  });

  test('no results for empty value', () => {
    const result = instance.getText('');

    expect(result).toStrictEqual([]);
  });
});
