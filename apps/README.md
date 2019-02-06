https://www.npmjs.com/package/terser
https://rollupjs.org/guide/en
https://code.lengstorf.com/learn-rollup-js/





terser src/lib/cannon.physics.js        -o usr/lib/cannon.physics.js        -c -m
terser src/lib/three.graphics.js        -o usr/lib/three.graphics.js        -c -m
terser src/lib/three.loader.js          -o usr/lib/three.loader.js          -c -m
terser src/lib/cannon.three.debug.js    -o usr/lib/cannon.three.debug.js    -c -m
terser src/lib/three.raycast.js         -o usr/lib/three.raycast.js         -c -m
terser src/lib/clock.js                 -o usr/lib/clock.js                 -c -m
terser src/lib/Stats.js                 -o usr/lib/Stats.js                 -c -m
terser src/lib/engine.js                -o usr/lib/engine.js                -c -m
terser src/lib/keyboard.js              -o usr/lib/keyboard.js              -c -m
cp src/index.js     usr/index.js
cp src/cg-scene.js  usr/cg-scene.js


terser src/lib/cannon.physics.js \
src/lib/three.graphics.js \
src/lib/three.loader.js \
src/lib/cannon.three.debug.js \
src/lib/three.raycast.js \
src/lib/clock.js \
src/lib/Stats.js \
src/lib/engine.js \
-o usr/lib/cg-scene.js -c -m

