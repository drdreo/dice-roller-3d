import diceRoller from '../js/roll-a-die';
import Errors from '../js/Types';

const element = document.createElement('div');
jest.useFakeTimers();

describe('Roll A Die', function () {
  afterEach(function () {
    Array.prototype.forEach.call(element.children, e => element.removeChild(e));
  });

  it('should roll a die successfully.', function () {
    const cb = (r) => r;
    diceRoller({ element, numberOfDice: 1, callback: cb, noSound: true });
    diceRoller({ element, numberOfDice: 2, callback: cb, noSound: true });
  });

  it('should return a result.', function () {
    const result = diceRoller({ element, numberOfDice: 1, noSound: true });
    expect(result).toHaveLength(1);
  });

  it('should call callback.', function () {
    const cb = jest.fn();
    console.log(typeof cb);

    diceRoller({ element, numberOfDice: 1, callback: cb, noSound: true });
    expect(cb).not.toBeCalled();
    jest.runAllTimers();

    expect(cb).toBeCalled();
  });

  it('should use given values.', function () {
    const result = diceRoller({
      element,
      numberOfDice: 2,
      noSound: true,
      values: [4, 6],
    });
    expect(result).toHaveLength(2);
    expect(result[0]).toBe(4);
    expect(result[1]).toBe(6);
  });
});

describe('Check For Required Params', () => {
  afterEach(function () {
    Array.prototype.forEach.call(element.children, e => element.removeChild(e));
  });
  const cb = (r) => result = r;
  const defaultOption = {
    element,
    numberOfDice: 2,
    callback: cb,
    noSound: true,
    values: [4, 6],
  };
  test('should throw on missing element.', () => {
    const options = Object.assign({}, defaultOption, { element: null });
    expect(() => diceRoller(options)).toThrow(Errors.MISSING_ELEMENT);
  });
  test('should throw on missing numberOfDice.', () => {
    const options = Object.assign({}, defaultOption, { numberOfDice: null });
    expect(() => diceRoller(options)).toThrow(Errors.MISSING_NUMBER_OF_DICE);
  });
});

describe('Check For Invalid Params', () => {
  afterEach(function () {
    Array.prototype.forEach.call(element.children, e => element.removeChild(e));
  });
  const cb = (r) => result = r;
  const defaultOption = {
    element,
    numberOfDice: 2,
    callback: cb,
    noSound: true,
  };

  test('should throw on invalid element type.', () => {
    const options = Object.assign({}, defaultOption, { element: 'Hello World!' });
    expect(() => diceRoller(options)).toThrow(Errors.INVALID_ELEMENT);
  });
  test('should throw on invalid numberOfDice type.', () => {
    let options = Object.assign({}, defaultOption, { numberOfDice: true });
    expect(() => diceRoller(options)).toThrow(Errors.NUMBER_OF_DICE_NUMBER);
    options = Object.assign({}, defaultOption, { numberOfDice: 2.9 });
    expect(() => diceRoller(options)).toThrow(Errors.NUMBER_OF_DICE_INTEGER);
  });
  test('should throw on invalid callback.', () => {
    const options = Object.assign({}, defaultOption, { callback: 34 });
    expect(() => diceRoller(options)).toThrow(Errors.INVALID_CALLBACK);
  });
  test('should throw on invalid delay type.', () => {
    const options = Object.assign({}, defaultOption, { delay: '5000' });
    expect(() => diceRoller(options))
      .toThrow(Errors.INVALID_DELAY_TYPE);
  });
  test('should throw on invalid values type.', () => {
    const options = Object.assign({}, defaultOption,
      { values: { val: 'Hello World!' } });
    expect(() => diceRoller(options))
      .toThrow(Errors.INVALID_VALUES);
  });
  test('should throw on invalid values length.', () => {
    const options = Object.assign({}, defaultOption,
      { values: [4, 5, 6] });
    expect(() => diceRoller(options))
      .toThrow(Errors.INVALID_VALUES_LENGTH);
  });
  test('should throw on invalid float value in values.', () => {
    const options = Object.assign({}, defaultOption,
      { values: [5.5, 6] });
    expect(() => diceRoller(options))
      .toThrow(Errors.INVALID_VALUE_INTEGER(5.5));
  });
  test('should throw on invalid string value in values.', () => {
    const options = Object.assign({}, defaultOption,
      { values: [5, '6'] });
    expect(() => diceRoller(options))
      .toThrow(Errors.INVALID_VALUE_NUMBER('6'));
  });
});
