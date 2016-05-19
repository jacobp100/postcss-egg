# postcss-egg

A PostCSS plugin to convert CSS Expressive Generalizations and Gadgetry Level 1 to current CSS.

### [View Specification](https://drafts.csswg.org/css-egg/)

Supports:

###### Units
* Attoparsec
* Picolightsecond
* Lightsecond
* Parsec
* Fortnight
* Millifortnight
* Timble

###### Functions
* Double Rainbow

# Usage

```js
import postcss from 'postcss';
import egg from 'postcss-egg';

postcss([egg]).process(...);
```

## With Gulp

```js
import postcss from 'gulp-postcss';
import egg from 'postcss-egg';

gulp.task('default', () => (
  gulp.src('styles/**')
    .pipe(postcss([
      egg
    ]))
    .pipe(gulp.dest('dist'))
));
```

![EGG](https://raw.githubusercontent.com/jacobp100/postcss-egg/master/unicorn.png)
