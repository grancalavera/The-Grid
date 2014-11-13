function mkexports(root, name) {
    var isBrowser = typeof exports === 'undefined'
    return [ root, isBrowser ? root[name] = {} : exports, !isBrowser ]
}

(function (root, exports, isNode) {
    var _ = root._ || require('lodash')
    function Grid(cols, rows) {
        var id = _.identity
        ,   all = _.range(0, cols * rows)
        function map            (fn)    { return _.map(all, fn) }
        function coords         (x)     { return [ Math.floor(x / cols), x % cols ]}
        function prettyCoords   (x)     { return '(' + coords(x).join(',') + ')' }
        function address        (c, r)  { return c + r * rows }
        function distance       (c, r)  { return function (x) { return Math.max(
            Math.abs(c - coords(x)[0]),
            Math.abs(r - coords(x)[1])
        )}}
        function show(fn, join){ return _.chain(all)
            .map(fn || id)
            .reduce(function (memo, x, i) {
                if (i % cols === 0) { memo.push([]) }
                memo[memo.length - 1].push(x)
                return memo
            }, [])
            .map(function (row) { return row.join(join || '\t') })
            .value()
            .join('\n')
        }
        return {
            all:            all,
            map:            map,
            show:           show,
            coords:         coords,
            address:        address,
            distance:       distance,
            prettyCoords:   prettyCoords,
            rows: function() { return _.range(0, rows)},
            cols: function() { return _.range(0, cols)},
        }
    }
    exports.make = Grid
    exports.rows = 2
    exports.cols = 1
}).apply(null, mkexports(this, 'Grid'))
