/*
 * Web Inquirer V 0.8
 * Copyright 2016-2018 XWolfOverride@gmail.com
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies
 * or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var inquirer = inquirer || new function () {

    var icon = "data:image/gif;base64,R0lGODlhIAAgAKECADIyMjMzM////////yH5BAEKAAIALAAAAAAgACAAAAJulI8Zke2PFoC0LlZzW7qf633XGGHeiJqcaKWgsQov5JLvTNeYq+kM36vBUJNgaujDiVDIpLK58ylIiiU0NjWVZscHgAuUUXPOpfbhjD1bwmFIrHsvv+3Qrd4Byzda7N7h9zclmEOIFmgolgj4VgAAOw==", //
        bugico = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAWlBMVEUkJSMuMC01NzQ+Pz1HSEZPUU5YWldfYV5pa2h6e3iOkI2YmpeipKGpq6ifwFWqxma4urezzHa50YHJy8jC1pLL3aLS4K3a3NnZ5rvo6+fn8NXv8+L19/D9//y9fxQqAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+EBBAwFN28edE4AAABVaVRYdENvbW1lbnQAAAAAAENvcHlyaWdodCBJTkNPUlMgR21iSCAod3d3Lmljb25leHBlcmllbmNlLmNvbSkgLSBVbmxpY2Vuc2VkIHByZXZpZXcgaW1hZ2VYrophAAAC6UlEQVRYw+2X2barIAxA0U5qK2jFAor//5uXSUUS2q5z1n07vNhC2JCYSbL8cpA/wAeAGswQPwc0xI3qO4BWcPVs95/gvNYQIAhpgGBtATcw3RLSpgBtRYdU8oLeQNhZlQCUnazDny7YrfM2uK8Hh+fDTopUBavuOfwuH+4xlB5QdP5vEU69xdfaAMOONT8fQg012UY1CNGuV1HxraK3UGw6XEhm+BveYw0igNWh3OyJD6fD1WqF+EG7glUeYJdFEWsQe6I1WTG8BdjVMn6JB8DNvXTjY12R2X9HnDMCqNPqSxmCebl6UWatFHgwmdtdl4XzoGcyrHav3rp3IXLRqEq9SEqf5qQq3X8xao+UjstyEvlwNgZglNLePMX9FJ1e203cLDEn9CYfvKgdTLqgaWsDKa6NM4xkbol/SCheyiBek4+8zh04yz4sUP0WMNN9sHHywrNk0bR8C+jpYbDcXBZAEWGWTM5vAHMiSzGAzAH8i4aAdM46GgSI7lrAw5zJKdSrvLRJSmtc9tWprNUXm6z3akH29N0sE5CdELsYI7hse90BPvt1OABOjiFlXFeA338WNpCgxSGAL9qnzUo7gK+ANp+Cl0BfC0J9bmXTEEioHi4fc+S2GUAgNAZQ7zWJI7cN8QkAPrvfDGDYaxrHZMcMwFW4u7VBV3fBKaBs/wZgNrZJLEB1WUavTDBN3wFeWcD8HUDmwxkDPCkWYWg4KyjMQEKyhtVoYVGnFhoBA0hTdwQEmLJUwYTA0BzRuDKVAEzRNS2M/AwYF20KX6HTjBQcugc5jYELtD74j4C1b5kBAGaIQ0dHou7ihnhjCuBrAiqOABHqPwiIWSNePEQ6kEgDhYTUNCNRoEmaVF3jsvXEcSmU0zG97D10GQOcBu3eJjAMwOZjt9ylAIEF9ktiMWg9IbTmZLvT/dirhI08ZLTx2BaYNqxKHAl+2EgbWtyatJcafAyJbz555rHvOePTb77atP77cv3/gH8Wkk7NciByTQAAAABJRU5ErkJggg==", //
        VERSION = "0.8",//
        alertIcon,
        config = {
            color: {
                normal: "#000",
                gray: "#777",
                string: "#0A0",
                number: "#00B",
                keyword: "#809",
            },
        }; //

    // Locals
    var inq = this, inqapp;

    // Types
    function BasicError(data) {
        this.merge(data);
    }

    // Tools
    function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /** A formatter tool for console output */
    function formatter(rtd) {
        var r, p, rtp, i;
        r = document.createElement("span");
        for (i in rtd) {
            rtp = rtd[i];
            if (!rtp)
                continue;
            if (rtp instanceof Node)
                r.appendChild(rtp);
            else {
                p = document.createElement("span");
                p.data = rtp;
                if (rtp.c)
                    p.style.color = rtp.c;
                if (rtp.s)
                    p.style.fontSize = rtp.s;
                if (rtp.v)
                    p.innerText = rtp.v;
                if (rtp.h)
                    p.innerHTML = rtp.h;
                if (rtp.onclick) {
                    p.onclick = rtp.onclick;
                    //p.style.textDecoration = "underline";
                    p.style.cursor = "pointer";
                }
                if (rtp.tooltip)
                    p.title = rtp.tooltip;
                r.appendChild(p);
            }
        }
        return r;
    }

    /** expandable object resume */
    function compactObject(m, d) {
        var r, f, mn, dn;
        r = document.createElement("span");
        f = document.createElement("span");
        mn = formatter(m);
        function icon(angle) {
            return "<svg height='10' width='10' style='vertical-align:middle'><circle cx='5' cy='5' r='4' stroke='gray' stroke-width='1.1' fill='white' /><polygon transform='rotate(" + angle + " 5 5)' points='4,3 6.5,5 4,7' fill='black' />#</svg>";
        }
        function open() {
            f.innerHTML = icon(90);
            if (r.contains(mn))
                r.removeChild(mn);
            if (dn == null) {
                if (typeof d === "function")
                    d = d();
                dn = formatter(d);
            }
            r.appendChild(dn);
            f.onclick = close;
            return r;
        }
        function close() {
            f.innerHTML = icon(0);
            if (r.contains(dn))
                r.removeChild(dn);
            r.appendChild(mn);
            f.onclick = open;
            return r;
        }
        f.style.cursor = "pointer";
        r.appendChild(f);
        r.close = close;
        r.open = open;
        close();
        return r;
    }

    /** formatice function details */
    function functionDetails(f) {
        var s, r = [];
        if (f) {
            s = f.toString().trim();
            r.push({ c: config.color.keyword, v: "function " });
            if (s.substr(0, 8) === "function")
                s = s.substr(8).trim();
            r.push({ c: config.color.normal, v: s });
        }
        return r;
    }

    /** formatice object resume (basic mode) */
    function objectResume(obj, max) {
        var r = [], k, first = true;
        if (max === undefined)
            max = 10;
        if (Array.isArray(obj)) {
            r.push({ c: config.color.normal, v: "[" });
            r.push({ c: config.color.gray, s: "8px", v: obj.length });
            r.push({ c: config.color.normal, v: "]" });
        } else {
            if (obj.constructor) {
                var oname = functionName(obj.constructor);
                if (oname && oname.toLowerCase() != "object")
                    r.push({ c: config.color.normal, v: functionName(obj.constructor) });
            }
            r.push({ c: config.color.normal, v: "{" });
            for (k in obj) {
                if (max-- <= 0) {
                    r.push({ c: config.color.normal, v: "…" });
                    break;
                }
                if (first)
                    first = false;
                else
                    r.push({ c: config.color.normal, v: ", " });
                r.push({ c: config.color.keyword, v: k });
            }
            r.push({ c: config.color.normal, v: "}" });
        }
        return r;
    }

    /** foramtice object details */
    function objectDetails(obj) {
        return function () {
            var r = [], k, d;
            if (Array.isArray(obj)) {
                r.push({ c: config.color.normal, v: "[" });
                r.push({ c: config.color.gray, s: "8px", v: obj.length });
            } else {
                if (obj.constructor) {
                    var oname = functionName(obj.constructor);
                    if (oname && oname.toLowerCase() != "object")
                        r.push({ c: config.color.normal, v: functionName(obj.constructor) });
                }
                r.push({ c: config.color.normal, v: "{" });
            }
            for (k in obj) {
                r.push(d = document.createElement("div"));
                d.appendChild(formatter([
                    { c: config.color.keyword, v: k + " " },
                    { c: config.color.normal, v: ": " },
                    objectRow(obj[k])
                ]))
                d.style.paddingLeft = "8px";
            }
            r.push({ c: config.color.normal, v: Array.isArray(obj) ? "]" : "}" });
            return r;
        };
    }

    /** return the function name */
    function functionName(f) {
        if (!f)
            return "";
        if (f.name)
            return f.name;
        var funcNameRegex, result;
        funcNameRegex = /function (.{1,})\(/;
        result = (funcNameRegex).exec(f.toString());//(this).constructor.toString());
        result = (result && result.length > 1) ? result[1] : "";
        if (result.indexOf("{") >= 0)
            result = result.substr(0, result.indexOf("{"));
        if (result.length && result.length > 128)
            result = "";
        return result;
    }

    /** Advanced way to show object on screen */
    function objectRow(obj, full, expanded) {
        var row, robj;
        row = document.createElement("span");
        if (obj === null)
            row.appendChild(formatter([{ c: config.color.gray, v: "<null>" }]));
        else if (obj === undefined)
            row.appendChild(formatter([{ c: config.color.gray, v: "<undefined>" }]));
        else {
            row.appendChild(formatter([inspectorLink(obj)]));
            switch (typeof obj) {
                case "string":
                    if (!full && obj.length > 512)
                        row.appendChild(formatter([
                            { c: config.color.normal, v: '"' },
                            { c: config.color.string, v: obj.substr(0, 512) },
                            { c: config.color.normal, v: '…', onclick: function () { openInspector(obj); } },
                            { c: config.color.normal, v: '"' },
                        ]))
                    else
                        row.appendChild(formatter([
                            { c: config.color.normal, v: '"' },
                            { c: config.color.string, v: obj },
                            { c: config.color.normal, v: '"' },
                        ]))
                    break;
                case "number":
                    row.appendChild(formatter([
                        { c: config.color.number, v: obj },
                    ]));
                    break;
                case "function":
                    row.appendChild(robj = compactObject([
                        { c: config.color.keyword, v: "function" },
                        obj.name ? { c: config.color.normal, v: " " + functionName(obj) } : null,
                        { c: config.color.normal, v: "() {…}" },
                    ],
                        functionDetails(obj)
                    ));
                    break;
                case "object":
                    row.appendChild(robj = compactObject(objectResume(obj, full == -1 ? 0 : 10), objectDetails(obj)));
                    break;
                default:
                    row.innerText = obj;
                    break;
            }
        }
        if (robj && expanded)
            robj.open();
        return row;
    }

    function inspectorLink(object) {
        return {
            c: config.color.gray,
            h: "<svg height='10' width='10' style='vertical-align:middle'><circle cx='4' cy='3.5' r='3' stroke='#DDD' stroke-width='1' fill='white' /><polygon points='5,6 8,10 9,8 6,5' fill='#DDD' />%</svg>",
            onclick: function () {
                openInspector(object);
            },
            tooltip: "Show on variable inspector"
        }
    }

    function objectTable(obj) {
        var i, cname, colmap = {}, tbl, tr, td, vth, rown, sl;
        function mkElement(type, style) {
            var el = document.createElement(type);
            el.style.merge(style);
            return el;
        }
        function isValue(val) {
            if (!val)
                return true;
            switch (typeof val) {
                case "function":
                case "object":
                    return Array.isArray(val);
            }
            return true;
        }
        function mkTd(value, empty) {
            td = mkElement("td", { fontSize: "10px", borderLeft: "1px solid #EEE", whiteSpace: "nowrap" });
            if (!empty)
                td.appendChild(objectRow(value, -1, false));
            tr.appendChild(td);
        }
        tbl = mkElement("table", { emptyCells: "hide", borderCollapse: "collapse" });
        // Discover columns
        tr = mkElement("tr");
        td = mkElement("th", { fontSize: "10px", fontWeight: "bold", color: "gray" });
        tr.appendChild(td);
        for (i in obj) {
            var row = obj[i];
            if (isValue(row)) {
                if (!vth) {
                    vth = mkElement("th", { fontSize: "10px", background: "#CEC" });
                    vth.innerText = "#";
                    if (tr.firstChild.nextSibling)
                        tr.insertBefore(vth, tr.firstChild.nextSibling);
                    else
                        tr.appendChild(vth);
                }
            } else for (cname in row)
                if (!colmap[cname]) {
                    var col = colmap[cname] = mkElement("th", { fontSize: "10px", background: "#CEC" });
                    col.innerText = cname;
                    tr.appendChild(col);
                }
        }
        tbl.appendChild(tr);
        // Fill data
        rown = 1;
        for (i in obj) {
            var row = obj[i];
            tr = mkElement("tr");
            tr.addEventListener("click", function () {
                if (sl)
                    sl.style.background = sl.bbgg;
                if (!this.bbgg)
                    this.bbgg = this.style.background;
                this.style.background = "#DDF";
                sl = this;
            });
            tr.addEventListener("mouseover", function () {
                if (!this.bbgg)
                    this.bbgg = this.style.background;
                this.style.background = "#EEF";
            });
            tr.addEventListener("mouseleave", function () {
                if (sl == this)
                    this.style.background = "#DDF";
                else
                    this.style.background = this.bbgg;
            });
            tr.style.background = rown == 0 ? "#F8F8F8" : "#FFF";
            td = mkElement("td", { fontSize: "10px", background: "rgba(0,0,0,0.05)", whiteSpace: "nowrap" });
            td.appendChild(formatter([inspectorLink(row), { v: i }]));
            tr.appendChild(td);
            if (vth) {
                if (isValue(row)) {
                    mkTd(row);
                    for (cname in colmap)
                        mkTd(null, true);
                } else {
                    mkTd(null, true);
                    for (cname in colmap)
                        mkTd(row[cname]);
                }
            } else
                for (cname in colmap)
                    mkTd(row[cname]);
            tbl.appendChild(tr);
            rown = (rown + 1) % 2;
        }

        return tbl;
    }

    // Methods
    /**
     * Error window handling
     * @param {*string} eMessage Error message
     * @param {*string} eData Error message extended information
     */
    function openErrorBox(eMessage, eData) {
        var wid, win, wwidth = 400, wheight = 150;
        wid = "error";// + uuid();
        win = getApp().windows[wid];
        if (!win) {
            win = merger.ui.window(wid, {
                title: "Error",
                width: wwidth,
                height: wheight,
                content: [merger.ui.picture("Iico", {
                    src: bugico,
                    top: 0,
                    left: 0,
                    width: 32,
                    height: 32,
                }),
                merger.ui.label("Lerror", {
                    top: 0,
                    left: 37,
                    width: wwidth - 37,
                    height: 32,
                    text: "",
                }),
                merger.ui.label("Tinfo", {
                    top: 37,
                    left: -5,
                    width: wwidth,
                    height: wheight - 37 - 25 - 10,
                    multiple: true,
                    style: {
                        whiteSpace: "pre",
                        fontFamily: "Lucida Console, Monospace",
                        border: "0",
                        overflow: "scroll",
                        background: "#EEE",
                        padding: "5px",
                    },
                }),
                merger.ui.button("Bok", {
                    top: wheight - 20,
                    left: wwidth - 35,
                    width: 35,
                    height: 20,
                    text: "Ok",
                    onClick: function (e) {
                        this.getWindow().close();
                    }
                }),
                ],
                onClose: function () {
                    this.hide();
                },
                load: function (msg, data) {
                    win.content.Lerror.setText(msg);
                    win.content.Tinfo.setText(data);
                }
            });
            getApp().addWindow(win);
        }
        win.load(eMessage, eData);
        win.show();
        return win;
    }

    /** 
     * Get the console window
     */
    function getConsole() {
        var wid, win, wwidth = 300, wheight = 250, inputHeight = 20;
        wid = "console";
        win = getApp().windows[wid];
        if (document.body.scrollWidth)
            wwidth = Math.max(wwidth, document.body.scrollWidth - 200);
        if (document.body.scrollHeight)
            wheight = Math.max(wheight, document.body.scrollHeight - 150);
        if (!win) {
            win = merger.ui.window(wid, {
                title: "Console",
                width: wwidth,
                height: wheight,
                resizable: true,
                content: [
                    merger.ui.html("Hconsole", {
                        top: 0,
                        left: 0,
                        width: wwidth,
                        height: wheight - (inputHeight - 5),
                        anchor: "TRBL",
                        style: {
                            overflow: "scroll",
                            userSelect: "text"
                        },
                    }),
                    merger.ui.textbox("Tinput", {
                        top: wheight - (inputHeight - 5),
                        left: -5,
                        width: wwidth + 5,
                        height: inputHeight,
                        placeholder: "javascript code here",
                        anchor: "LBR",
                        //multiple: true,
                        style: {
                            whiteSpace: "pre",
                            fontFamily: "Lucida Console, Monospace",
                            border: "0",
                            overflow: "scroll",
                            background: "#EEE",
                            padding: "3px",
                            boxSizing: "border-box",
                        },
                        onkeydown: function (e) {
                            var t, stop;
                            switch (e.keyCode) {
                                case 13:
                                    this.getWindow().exec(this.getText());
                                    t = "";
                                    stop = true;
                                    break;
                                case 38:
                                    t = this.getWindow().conhis.up();
                                    stop = true;
                                    break;
                                case 40:
                                    t = this.getWindow().conhis.down();
                                    stop = true;
                                    break;
                            }
                            if (t != undefined) {
                                this.setText(t);
                            }
                            if (stop)
                                return false;
                        },
                    }),
                ],
                conhis: {
                    data: [],
                    sel: 0,
                    add: function (code) {
                        var idx = this.data.indexOf(code);
                        if (idx >= 0)
                            this.data.splice(idx, 1);
                        this.data.push(code);
                        this.sel = this.data.length;
                    },
                    up: function () {
                        if (this.sel > 0)
                            this.sel--;
                        return this.data[this.sel];
                    },
                    down: function () {
                        if (this.sel < this.data.length)
                            this.sel++;
                        else return;
                        if (this.sel == this.data.length)
                            return "";
                        return this.data[this.sel];
                    }
                },
                onClose: function () {
                    this.hide();
                    //getApp().removeWindow(win);
                },
                log: function (type, object) {
                    var row = document.createElement("div");
                    var head = document.createElement("div");
                    var clear = document.createElement("div");
                    var d = document.createElement("div");
                    row.style.merge({
                        margin: "0 0 0 13px",
                    });
                    head.style.merge({
                        fontFamily: "Lucida Console, Monospace",
                        fontWeight: "bold",
                        float: "left",
                        margin: "0 0 0 -13px",
                        width: "13px",
                    });
                    d.style.merge({
                        whiteSpace: "pre-wrap",
                        float: "right",
                        fontFamily: "Lucida Console, Monospace",
                        border: "0",
                        width: "100%",
                    });
                    clear.style.merge({
                        clear: "both",
                    });
                    switch (type) {
                        case 'i':
                            d.innerText = object;
                            head.appendChild(document.createTextNode(">"));
                            head.style.color = "#88F";
                            d.style.paddingBottom = "3px";
                            break;
                        case 'o':
                            d.appendChild(objectRow(object));
                            d.style.borderBottom = "1px solid #EEE";
                            head.appendChild(document.createTextNode("<"));
                            head.style.color = "#DDD";
                            break;
                        case 'e':
                            d.appendChild(objectRow(object));
                            head.appendChild(document.createTextNode("!"));
                            head.style.cursonr = "pointer";
                            head.onclick = function () {
                                getApp().showError(object);
                            }
                            head.style.color = "#F88";
                            d.style.background = "#FEE";
                            head.style.background = "#FEE";
                            break;
                    }
                    d.data = object;
                    row.appendChild(head);
                    row.appendChild(d);
                    row.appendChild(clear);
                    this.content.Hconsole.appendChild(row);
                    this.content.Hconsole.scrollTop = this.content.Hconsole.scrollHeight;
                },
                exec: function (code) {
                    if (code == null || typeof code != "string" || code.length < 1)
                        return;
                    this.conhis.add(code);
                    var obj;
                    this.log('i', code);
                    try {
                        obj = eval('(' + code + ')');
                    } catch (err) {
                        window.console.error(err);
                        return;
                    }
                    window.console.log(obj);
                },
                write: function () {
                    var k;
                    for (k in arguments)
                        this.log('o', arguments[k]);
                },
                writeError: function () {
                    var k;
                    for (k in arguments)
                        this.log('e', arguments[k]);
                },
                load: function () {
                    win.write("Inquirer " + VERSION + " console.");
                }
            });
            getApp().addWindow(win);
            win.load();
        }
        return win;
    }

    /** 
     * Open the console window
     */
    function openConsole() {
        var win = getConsole();
        win.show();
        return win;
    }

    /**
     * Open the properties window
     */
    function openProperties() {
        var wid, win, wwidth = 175, wheight = 100;
        wid = "preferences";
        win = getApp().windows[wid];
        if (!win) {
            win = merger.ui.window(wid, {
                title: "Preferences",
                width: wwidth,
                height: wheight,
                content: [
                    merger.ui.checkbox("pref_autoshow", {
                        top: 0,
                        left: 3,
                    }),
                    merger.ui.label("pref_autoshow_lbl", {
                        top: 0,
                        left: 20,
                        text: "Open Inquirer on error"
                    }),
                    merger.ui.checkbox("pref_erricon", {
                        top: 15,
                        left: 3,
                    }),
                    merger.ui.label("pref_erricon_lbl", {
                        top: 15,
                        left: 20,
                        text: "Show small error indicator"
                    }),
                    merger.ui.button("pref_save", {
                        top: wheight - 20,
                        left: wwidth - 27,
                        text: "Ok",
                        onClick: function () {
                            inq.autoShow = this.getWindow().content.pref_autoshow.checked;
                            inq.alertIcon = this.getWindow().content.pref_erricon.checked;
                            this.getWindow().close();
                        }
                    }),
                ],
                onShow: function () {
                    this.getWindow().content.pref_autoshow.checked = inq.autoShow;
                    this.getWindow().content.pref_erricon.checked = inq.alertIcon;
                }
            });
            getApp().addWindow(win);
        }
        win.show();
        return win;
    }

    /**
     * Open inspector window
     * @param {*} object Any object to inspect
     */
    function openInspector(object) {
        var wid, win, wwidth = 350, wheight = 400, panel;
        wid = "inspector_" + uuid();
        win = merger.ui.window(wid, {
            title: "Inspector",
            width: wwidth,
            height: wheight,
            resizable: true,
            content: [
                panel = merger.ui.html("panel", {
                    top: 0,
                    left: 0,
                    width: wwidth,
                    height: wheight - 25,
                    anchor: "TBRL",
                    style: {
                        overflow: "scroll",
                        fontFamily: "Lucida Console, Monospace",
                        border: "0",
                        userSelect: "text"
                    },
                }),
                merger.ui.button("insp_close", {
                    top: wheight - 20,
                    left: wwidth - 27,
                    text: "Ok",
                    anchor: "BR",
                    onClick: function () {
                        this.getWindow().close();
                    }
                }),
            ],
            frameTools: [
                merger.ui.toggleButton("isp_asObject", {
                    icon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgdmlld0JveD0iMCAwIDMyIDMyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0aXRsZS8+PGcgZGF0YS1uYW1lPSI0OC1PcHRpb24iIGlkPSJfNDgtT3B0aW9uIj48cGF0aCBkPSJNMjAsMzJIMmEyLDIsMCwwLDEtMi0yVjEyYTIsMiwwLDAsMSwyLTJIMjBhMiwyLDAsMCwxLDIsMlYzMEEyLDIsMCwwLDEsMjAsMzJaTTIsMTJWMzBIMjBWMTJaIi8+PHBhdGggZD0iTTMwLDIySDI1VjIwaDVWMkgxMlY3SDEwVjJhMiwyLDAsMCwxLDItMkgzMGEyLDIsMCwwLDEsMiwyVjIwQTIsMiwwLDAsMSwzMCwyMloiLz48L2c+PC9zdmc+",
                    title: "Show as object",
                    width: 30,
                    selected: true,
                    group: "mode",
                    onClick: function () {
                        this.getWindow() && this.getWindow().load(false);
                    }
                }), merger.ui.toggleButton("isp_asTable", {
                    icon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxNzkyIiB2aWV3Qm94PSIwIDAgMTc5MiAxNzkyIiB3aWR0aD0iMTc5MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTc2IDEzNzZ2LTE5MnEwLTE0LTktMjN0LTIzLTloLTMyMHEtMTQgMC0yMyA5dC05IDIzdjE5MnEwIDE0IDkgMjN0MjMgOWgzMjBxMTQgMCAyMy05dDktMjN6bTAtMzg0di0xOTJxMC0xNC05LTIzdC0yMy05aC0zMjBxLTE0IDAtMjMgOXQtOSAyM3YxOTJxMCAxNCA5IDIzdDIzIDloMzIwcTE0IDAgMjMtOXQ5LTIzem01MTIgMzg0di0xOTJxMC0xNC05LTIzdC0yMy05aC0zMjBxLTE0IDAtMjMgOXQtOSAyM3YxOTJxMCAxNCA5IDIzdDIzIDloMzIwcTE0IDAgMjMtOXQ5LTIzem0tNTEyLTc2OHYtMTkycTAtMTQtOS0yM3QtMjMtOWgtMzIwcS0xNCAwLTIzIDl0LTkgMjN2MTkycTAgMTQgOSAyM3QyMyA5aDMyMHExNCAwIDIzLTl0OS0yM3ptNTEyIDM4NHYtMTkycTAtMTQtOS0yM3QtMjMtOWgtMzIwcS0xNCAwLTIzIDl0LTkgMjN2MTkycTAgMTQgOSAyM3QyMyA5aDMyMHExNCAwIDIzLTl0OS0yM3ptNTEyIDM4NHYtMTkycTAtMTQtOS0yM3QtMjMtOWgtMzIwcS0xNCAwLTIzIDl0LTkgMjN2MTkycTAgMTQgOSAyM3QyMyA5aDMyMHExNCAwIDIzLTl0OS0yM3ptLTUxMi03Njh2LTE5MnEwLTE0LTktMjN0LTIzLTloLTMyMHEtMTQgMC0yMyA5dC05IDIzdjE5MnEwIDE0IDkgMjN0MjMgOWgzMjBxMTQgMCAyMy05dDktMjN6bTUxMiAzODR2LTE5MnEwLTE0LTktMjN0LTIzLTloLTMyMHEtMTQgMC0yMyA5dC05IDIzdjE5MnEwIDE0IDkgMjN0MjMgOWgzMjBxMTQgMCAyMy05dDktMjN6bTAtMzg0di0xOTJxMC0xNC05LTIzdC0yMy05aC0zMjBxLTE0IDAtMjMgOXQtOSAyM3YxOTJxMCAxNCA5IDIzdDIzIDloMzIwcTE0IDAgMjMtOXQ5LTIzem0xMjgtMzIwdjEwODhxMCA2Ni00NyAxMTN0LTExMyA0N2gtMTM0NHEtNjYgMC0xMTMtNDd0LTQ3LTExM3YtMTA4OHEwLTY2IDQ3LTExM3QxMTMtNDdoMTM0NHE2NiAwIDExMyA0N3Q0NyAxMTN6Ii8+PC9zdmc+",
                    title: "Show as table",
                    width: 30,
                    group: "mode",
                    onClick: function () {
                        this.getWindow().load(true);
                    }
                })
            ],
            load: function (asTable) {
                panel.innerHTML = "";
                if (asTable)
                    panel.appendChild(objectTable(object));
                else
                    panel.appendChild(objectRow(object, true, true));
            },
            onClose: function () {
                this.hide();
                getApp().removeWindow(win);
            }
        });
        getApp().addWindow(win);
        win.load();
        win.show();
        win.setTop(win.top + ((Math.random() * 60) - 30));
        win.setLeft(win.left + ((Math.random() * 60) - 30));
        return win;
    }

    /**
     * Get Inquirer application
     */
    function getApp() {
        if (!inqapp)
            inqapp = merger.app("inquirer", {
                title: "Inquirer",
                icon: icon,
                appMenu: [
                    merger.ui.menuItem("app_preferences", {
                        text: "Preferences...",
                        icon: merger.media.createIcon('#EEE', '⚒'),
                        onClick: function () {
                            openProperties();
                        }
                    }),
                ],
                menu: [
                    merger.ui.menuItem("app_tools", {
                        text: "Tools",
                        items: [merger.ui.menuItem("tool_console", {
                            text: "Console",
                            onClick: function () {
                                this.getApp().showConsole();
                            }
                        })
                        ]
                    }),
                    merger.ui.menuItem("app_special", {
                        text: "Special",
                        items: [merger.ui.menuItem("special_reload", {
                            text: "Reload page",
                            onClick: function () {
                                location.reload(false);
                            }
                        }), merger.ui.menuItem("special_reload_full", {
                            text: "Reload page (ignore cache)",
                            onClick: function () {
                                location.reload(true);
                            }
                        }), merger.ui.menuItem("special_debugger", {
                            text: "Call browser debugger",
                            onClick: function () {
                                debugger;
                            }
                        })
                        ]
                    })
                ],
                windows: [
                ],
                onLoad: function () {
                },
                onAbout: function () {
                    merger.dialogs.messageBox(this, "Inquirer v" + VERSION + " over Merger UI " + merger.version + " ©2016-2018 XWolf Override.<br>Debugger application layer for web pages. Useful for embedded browser debugging", "About Inquirer", null, this.icon, 100);
                },
                onFocus: function () {
                    removeIcon();
                    if (!getApp().getFocusedWindow())
                        openConsole();
                },
                showError: function (err) {
                    if (err instanceof Error)
                        openErrorBox(err.message, err.stack);
                    else
                        openErrorBox(err.message, "File: " + err.source + "\r\n\r\nAt: " + err.at);
                },
                showConsole: function () {
                    openConsole();
                }
            });
        return inqapp;
    }

    /**
     * Show a small yellow mark to indicate some error has been happend
     */
    function showIcon() {
        if (!alertIcon) {
            alertIcon = document.createElement("DIV");
            alertIcon.style.merge({
                position: "absolute",
                top: "0px",
                right: "3px",
                width: "2px",
                height: "1px",
                background: "gold",
                borderBottom: "goldenRod",
            });
            document.body.appendChild(alertIcon);
        }
        alertIcon.style.display = "";
    }

    /**
     * Hides a small yellow mark to indicate some error has been happend
     */
    function removeIcon() {
        if (!alertIcon)
            return;
        alertIcon.style.display = "none";
    }

    // === Public members

    function show() {
        getApp().show();
    }

    function hide() {
        getApp().windows.Wmain.close();
    }

    // On error hook
    function hookOnError() {
        var formerOnError = window.onerror;
        window.onerror = function (message, source, lineno, colno, err) {
            inq.error(new BasicError({
                message: message,
                source: source,
                at: lineno + ":" + colno,
                error: err,
                raw: arguments
            }));
            if (formerOnError)
                formerOnError.apply(window, arguments);
        }
    }

    // Konami code hook
    function hookKonamiCode() {
        var kc = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65], kcindex = 0 // Konami code
        document.addEventListener("keydown", function (e) {
            if (e.keyCode == kc[kcindex])
                kcindex++;
            else
                kcindex = 0;
            if (kcindex == kc.length)
                inquirer.show();
        }, false);
    }

    // Console hook
    function hookConsole() {
        if (!window.console)
            window.console = {};
        function consoleOverride(method, funct) {
            var old = window.console[method];
            window.console[method] = function () {
                funct.apply(window.console, arguments);
                if (old)
                    old.apply(window.console, arguments);
            };
            window.console[method].old = old;
        }
        consoleOverride("log", function () {
            openConsole().write.apply(openConsole(), arguments);
        })
        consoleOverride("info", function () {
            openConsole().write.apply(openConsole(), arguments);
        })
        consoleOverride("debug", function () {
            openConsole().write.apply(openConsole(), arguments);
        })
        consoleOverride("error", function () {
            openConsole().writeError.apply(openConsole(), arguments);
        })
    }

    // Install hooks
    function hook() {
        hookOnError();
        hookKonamiCode();
        hookConsole();
    }

    function error(error) {
        getConsole().writeError(error);
        if (this.autoShow) {
            getApp().showError(error);
            show();
        }
        if (this.alertIcon) {
            showIcon();
        }
    }

    function inspect(object) {
        openInspector(object);
        show();
    }

    function console() {
        getApp().showConsole();
        show();
    }

    function log() {
        getApp().windows.Wconsole.write.apply(getApp().windows.Wconsole, arguments);
    }

    // Publish
    this.merge({
        version: VERSION,
        autoShow: false,    // Open Inquirer environment when a new unhandled error happen
        alertIcon: true,    // Small icon on screen to indicate if there is any new error
        show: show,         // Enters environment
        hide: hide,         // Exit environent
        hook: hook,         // Hook the webpage to control errors (Automatically hooked)
        error: error,       // Collect an error and if autoShow is true enters environment
        inspect: inspect,   // Enters environment and open variable inspector
        console: console,   // Enters environment and open inquirer console
        log: log,           // Log an object into the console
        config: config,     // Configuration object
    });

    // Hook the page now
    hook();
}();
