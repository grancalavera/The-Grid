(function (root, exports, isNode) {
    var _ = root._ || require('lodash')
    function Grid(cols, rows) {
        var id = _.identity
        ,   all = _.range(0, cols * rows)
        function map            (fn)    { return _.map(all, fn) }
        function coords         (x)     { return [ x % cols, Math.floor(x / cols) ]}
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
            prettyCoords:   prettyCoords
        }
    }
    exports.make = Grid
}).apply(null, function(root, name) {
    var isBrowser = typeof exports === 'undefined'
    return [ root, isBrowser ? root[name] = {} : exports, !isBrowser ]
}(this, 'Grid'))
