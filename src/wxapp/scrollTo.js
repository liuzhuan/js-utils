/**
 * 将当前页面滚动到 el 所在位置
 * @param {string} el 元素标识符，比如 "#foo" 
 * @param {number} duration 滚动动画时长，单位 ms。默认值为 300。
 */
function scrollTo(el, duration=300) {
    getScrollTop(el, scrollTop => {
        wx.pageScrollTo({
            scrollTop,
            duration,
        })
    });
}

function getScrollTop(el, next) {
    if (!el) return;

    const query = wx.createSelectorQuery();
    query.select(el).boundingClientRect();
    query.selectViewport().scrollOffset();
    
    query.exec(function(res) {
        if (!res) return;

        const [target, screen] = res;
        if (!target || !screen) return;

        const targetTop = target.top || 0;
        const screenScrollTop = screen.scrollTop || 0;
        const targetScrollTop = targetTop + screenScrollTop;
        if (isFunction(next)) {
            next(targetScrollTop);
        }
    })
}

function isFunction(value) {
    return value && typeof value === 'function';
}

module.exports = scrollTo;