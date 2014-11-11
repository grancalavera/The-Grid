var _ = require('lodash')
module.exports = function Grid(cols, rows) {
    var id = _.identity
    ,   all = _.range(0, cols * rows)
    function map            (fn)    { return _.map(all, fn) }
    function coords         (x)     { return [ Math.floor(x / rows), x % rows ]}
    function prettyCoords   (x)     { return '(' + coords(x).join(',') + ')' }
    function address        (c, r)  { return c + r * rows }
    function distance       (c, r)  { return function (x) { return Math.max(
        Math.abs(c - coords(x)[0]),
        Math.abs(r - coords(x)[1])
    )}}
    function show(fn){ return _.chain(all)
        .map(fn || id)
        .reduce(function (memo, x, i) {
            if (i % rows === 0) { memo.push([]) }
            memo[memo.length - 1].push(x)
            return memo
        }, [])
        .map(function (row) { return row.join('\t') })
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
    }
}
