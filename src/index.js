import postcss from 'postcss';

const generateUnitRegex = unit => new RegExp(String.raw`(\d*\.?\d+)${unit}`, 'i');
const convert = (multiplier, unit) => match => `${parseFloat(match) * multiplier}${unit}`;
const converterFor = (originalUnit, multiplier, unit) => [
  generateUnitRegex(originalUnit),
  { fast: originalUnit },
  convert(multiplier, unit),
];

const stops = `
transparent 0%,
hsla(315, 100%, 50%, 0) 45%,
hsla(315, 100%, 50%, 0.5) 46%,
hsla(236, 100%, 50%, 0.5) 48%,
hsla(158, 100%, 50%, 0.5) 50%,
hsla(79, 100%, 50%, 0.5) 52%,
hsla(0, 100%, 50%, 0.5) 54%,
hsla(0, 100%, 50%, 0) 55%,
hsla(0, 100%, 50%, 0) 85%,
hsla(0, 100%, 50%, 0.25) 87.5%,
hsla(79, 100%, 50%, 0.25) 90%,
hsla(158, 100%, 50%, 0.25) 92.5%,
hsla(236, 100%, 50%, 0.25) 95%,
hsla(315, 100%, 50%, 0.25) 97.5%,
hsla(315, 100%, 50%, 0) 99%`
  .split('\n')
  .slice(1)
  .join(' ');

export default postcss.plugin('css-egg', () => css => {
  css
   .replaceValues(...converterFor('apc', 3.086, 'cm'))
   .replaceValues(...converterFor('pls', 1.133, 'px'))
   .replaceValues(...converterFor('ls', 1.133e12, 'px'))
   .replaceValues(...converterFor('pc', 3.086e18, 'cm'))
   .replaceValues(...converterFor('ftn', 1209600, 's'))
   .replaceValues(...converterFor('mftn', 1209600e-3, 's'))
   .replaceValues(generateUnitRegex('tmbl'), 'fast')
   .replaceValues(
     /double-rainbow\(([^,]+),\s*([^,]+)\)/i,
     `radial-gradient(circle $2 at $1, ${stops})`
   )
   .replaceValues(
     /double-rainbow\(([^,]+)\)/i,
     `radial-gradient(circle at $1, ${stops})`
   );
});
