import test from 'ava';
import postcss from 'postcss';
import egg from '../src';

test('converts basic units', t => {
  t.plan(12);

  return postcss([egg])
    .process(`
      .test {
        width: 1apc;
        height: 1pls;
        top: 1ls;
        left: 1pc;
        bottom: 1ftn;
        right: 1mftn;
      }
    `)
    .then(({ css }) => {
      t.is(css.indexOf('apc'), -1);
      t.not(css.indexOf('3.086cm'), -1);
      t.is(css.indexOf('pls'), -1);
      t.not(css.indexOf('1.133px'), -1);
      t.is(css.indexOf('ls'), -1);
      t.not(css.indexOf('1133000000000px'), -1);
      t.is(css.indexOf('pc'), -1);
      t.not(css.indexOf('3086000000000000000cm'), -1);
      t.is(css.indexOf('ftn'), -1);
      t.not(css.indexOf('1209600s'), -1);
      t.is(css.indexOf('mftn'), -1);
      t.not(css.indexOf('1209.6s'), -1);
    });
});

test('scales units for other values', t => {
  t.plan(2);

  return postcss([egg])
    .process(`
      .test {
        width: 10apc;
      }
    `)
    .then(({ css }) => {
      t.is(css.indexOf('apc'), -1);
      t.not(css.indexOf('30.86cm'), -1);
    });
});

test('speech units', t => {
  t.plan(2);

  return postcss([egg])
    .process(`
      .test {
        speech-rate: 10tmbl;
      }
    `)
    .then(({ css }) => {
      t.is(css.indexOf('tmbl'), -1);
      t.not(css.indexOf('fast'), -1);
    });
});

test('double rainbows with two values', t => {
  t.plan(2);

  return postcss([egg])
    .process(`
      .test {
        background: double-rainbow(bottom, closest-corner);
      }
    `)
    .then(({ css }) => {
      const expectedCss = 'radial-gradient(circle closest-corner at bottom, transparent 0%, hsla(315, 100%, 50%, 0) 45%, hsla(315, 100%, 50%, 0.5) 46%, hsla(236, 100%, 50%, 0.5) 48%, hsla(158, 100%, 50%, 0.5) 50%, hsla(79, 100%, 50%, 0.5) 52%, hsla(0, 100%, 50%, 0.5) 54%, hsla(0, 100%, 50%, 0) 55%, hsla(0, 100%, 50%, 0) 85%, hsla(0, 100%, 50%, 0.25) 87.5%, hsla(79, 100%, 50%, 0.25) 90%, hsla(158, 100%, 50%, 0.25) 92.5%, hsla(236, 100%, 50%, 0.25) 95%, hsla(315, 100%, 50%, 0.25) 97.5%, hsla(315, 100%, 50%, 0) 99%);'; // eslint-disable-line

      t.is(css.indexOf('double-rainbow'), -1);
      t.not(
        css.indexOf(expectedCss),
        -1,
        'double rainbow does not span all the way across the sky'
      );
    });
});

test('double rainbow with single value', t => {
  t.plan(2);

  return postcss([egg])
    .process(`
      .test {
        background: double-rainbow(bottom);
      }
    `)
    .then(({ css }) => {
      const expectedCss = 'radial-gradient(circle at bottom, transparent 0%, hsla(315, 100%, 50%, 0) 45%, hsla(315, 100%, 50%, 0.5) 46%, hsla(236, 100%, 50%, 0.5) 48%, hsla(158, 100%, 50%, 0.5) 50%, hsla(79, 100%, 50%, 0.5) 52%, hsla(0, 100%, 50%, 0.5) 54%, hsla(0, 100%, 50%, 0) 55%, hsla(0, 100%, 50%, 0) 85%, hsla(0, 100%, 50%, 0.25) 87.5%, hsla(79, 100%, 50%, 0.25) 90%, hsla(158, 100%, 50%, 0.25) 92.5%, hsla(236, 100%, 50%, 0.25) 95%, hsla(315, 100%, 50%, 0.25) 97.5%, hsla(315, 100%, 50%, 0) 99%);'; // eslint-disable-line

      t.is(css.indexOf('double-rainbow'), -1);
      t.not(
        css.indexOf(expectedCss),
        -1,
        'double rainbow does not span all the way across the sky'
      );
    });
});

test('there is *at least* one bug', t => {
  t.plan(2);

  return postcss([egg])
    .process(`
      .test {
        content: "1apc";
      }
    `)
    .then(({ css }) => {
      t.is(css.indexOf('apc'), -1);
      t.not(css.indexOf('3.086cm'), -1);
    });
});
