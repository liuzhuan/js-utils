# js-utils

这里汇集了日常使用的 Javascript 实用工具，使用了 CommonJS 模块规范。

这些工具之间相互独立，可能有功能的重叠。

各实用工具的简介如下。

## qsUtil

qsUtil 是 **querystring util** 的简称，主要用来操作 URL 和页面参数。内置五个函数，分别是：

1. `update(url, params)` 使用 `params` 中的键值对更新 `url` 中的页面参数
2. `del(url, keys)` 删除 `url` 的某些页面参数，这些参数由 `keys` 指定
3. `parseURL(url)` 将 `url` 解析为 `path`、`search` 和 `hash` 三部分
4. `parseSearch(search)` 将页面参数 `search` 字符串解析为对象格式
5. `stringifySearch(params)` 将对象格式 `params` 拼接为页面参数

[源码](./src/qsUtil.js)