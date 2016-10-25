/**
 * assets/index.js - idea-1
 * Copyright (C) 2016 PLADO Inc.
 */

window.config = function () {
    'use strict';

    const styles = document.getElementById('styles')
    const container = document.getElementsByClassName('container')[0]

    const genColor = function (min, max) {
        return `rgba(${[... new Array(3).keys()].map(function () {
            return Math.round((Math.random() * (max - min)) + min)
        })}, ${config.opacity})`
    }

    const genRow = function (i) {
        let sum = config.padding
        let target = document.body.offsetWidth
        let min = 0.05
        let height = (document.body.offsetHeight - ((config.rows+1) * config.padding)) / config.rows
        let elms = []
        let n = 0

        while (sum < target) {
            let tmp = (Math.random() * (target * (1 - min))) + (target * min)
            if ((sum + tmp + config.padding) > target) {
                tmp = target - sum - config.padding
                console.log('adjusting width')
            }

            if (tmp < (min * target)) {
                let prevwidth = elms[elms.length - 1].width
                prevwidth = prevwidth.substr(0, prevwidth.length - 2)
                prevwidth = parseFloat(prevwidth)

                elms[elms.length - 1].width = (prevwidth + tmp + config.padding) + 'px'
                sum = target
            } else {
                elms.push({
                    'width': tmp + 'px',
                    'height': height + 'px',
                    'left': (n === 0 ? 0 : (sum - config.padding)) + 'px',
                    'top': ((height+config.padding)*i) + 'px',
                    'background': genColor(50, 255)
                })

                sum += tmp + config.padding
                n += 1
                console.log('width = ' + sum + ' after ' + n + ' elms')
            }
        }

        let max = elms.sort(function (a, b) {
            return parseFloat(b.width.substr(0, b.width.length - 2)) - parseFloat(a.width.substr(0, a.width.length - 2))
        }).map(function (_, i) {
            return i
        })

        if (i === 0) elms[max[0]].html = `<p>Want to <strong>get paid</strong></p><p>for what <strong>you love</strong>?</p>`;
        if (i === 1) elms[max[0]].html = `<p>Teach at <strong>PLADO</strong>.</p>`
        if (i === (config.rows - 1)) {
            elms[max[0]].html = `<p><strong>plado.ca</strong></p>`;
            if (max.length > 1) elms[max[1]].html = `<p>Where <strong>everyone</strong> can teach.</p>`;
        }

        return elms.map(function (elm) {
            return `<div class="col" style="${Object.keys(elm).filter(key=>key!=='html').map(function (key) {
                return key + ':' + elm[key];
            }).join(';')}"><div class="content">${elm.html||''}</div></div>`
        }).join('')
    }

    const config = {
        padding: 5,
        opacity: .7,
        setRows: function (n) {
            config.rows = n
            document.body.innerHTML = [... new Array(n).keys()].map(function (_,i) {
                return genRow(i)
            }).join('')
        }
    }

    const updateCSS = function () {
        styles.innerHTML = `
        .col {
            border: solid ${config.padding}px #fff;
        }
        `

        requestAnimationFrame(updateCSS)
    }

    config.setRows(3)
    updateCSS()

    return config
}();