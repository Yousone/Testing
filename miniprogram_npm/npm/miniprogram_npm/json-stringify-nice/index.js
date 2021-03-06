module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1653046642202, function(require, module, exports) {
const isObj = val => !!val && !Array.isArray(val) && typeof val === 'object'

const compare = (ak, bk, prefKeys) =>
  prefKeys.includes(ak) && !prefKeys.includes(bk) ? -1
  : prefKeys.includes(bk) && !prefKeys.includes(ak) ? 1
  : prefKeys.includes(ak) && prefKeys.includes(bk)
    ? prefKeys.indexOf(ak) - prefKeys.indexOf(bk)
    : ak.localeCompare(bk, 'en')

const sort = (replacer, seen) => (key, val) => {
  const prefKeys = Array.isArray(replacer) ? replacer : []

  if (typeof replacer === 'function')
    val = replacer(key, val)

  if (!isObj(val))
    return val

  if (seen.has(val))
    return seen.get(val)

  const ret = Object.entries(val).sort(
    ([ak, av], [bk, bv]) =>
      isObj(av) === isObj(bv) ? compare(ak, bk, prefKeys)
      : isObj(av) ? 1
      : -1
  ).reduce((set, [k, v]) => {
    set[k] = v
    return set
  }, {})

  seen.set(val, ret)
  return ret
}

module.exports = (obj, replacer, space = 2) =>
  JSON.stringify(obj, sort(replacer, new Map()), space)
  + (space ? '\n' : '')

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1653046642202);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map