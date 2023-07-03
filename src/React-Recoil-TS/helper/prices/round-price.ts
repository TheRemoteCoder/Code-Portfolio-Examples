/**
 * Round price number value for a given precision.
 *
 * @link https://www.delftstack.com/de/howto/javascript/javascript-round-to-2-decimal-places
 */
const roundPrice = (price: number): number => {
  var val = Number((Math.abs(price) * 100).toPrecision(15));

  return (Math.round(val) / 100) * Math.sign(price);
};

export default roundPrice;
