/*
 * Web Inquirer V 0.3
 * Copyright 2016 XWolfOverride@gmail.com
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
        VERSION = "0.3"; //

    // Locals
    var inq = this, inqapp;

    // Tools
    function objectResume(obj) {
        var r, k, v;
        if (obj === null)
            return "<null>";
        if (obj === undefined)
            return "<undefined>";
        switch (typeof obj) {
            case "string":
                if (obj.length < 200)
                    return '"' + obj + '"';
                else
                    return '"' + obj.substr(0, 200) + "...";
            case "function":
                return "function";
            case "object":
                r = "";
                if (obj instanceof HTMLElement)
                    r += "<" + obj.tagName + ">:: ";
                else if (obj instanceof HTMLDocument)
                    r += "DOCUMENT:: ";
                else if (obj instanceof Window)
                    r += "WINDOW:: ";
                r += "{\n";
                for (k in obj) {
                    r += k + ":" + objectResume(obj[k]) + ",\n";
                    if (r.length > 500) {
                        r += " ...";
                        break;
                    }
                }
                r += "}";
                return r;
            default:
                return "" + obj;
        }
    }

    function objectResumeLink(obj) {
        var a = document.createElement("a");
        a.href = "#";
        a.onclick = function () {
            inq.inspect(obj);
            return false;
        }
        a.appendChild(document.createTextNode(objectResume(obj)));
        a.style.merge({
            color: "black",
            textDecoration: "none"
        });
        return a;
    }

    function errorLink(obj) {
        var a = document.createElement("a");
        a.href = "#";
        a.onclick = function () {
            getApp().showError(obj);
            return false;
        }
        a.appendChild(document.createTextNode(obj));
        a.style.merge({
            color: "black",
            textDecoration: "none"
        });
        return a;
    }

    // Methods
    function getApp() {
        if (!inqapp)
            inqapp = merger.app("inquirer", {
                title: "Inquirer",
                icon: icon,
                appMenu: [
                    merger.ui.menuItem("app_close", {
                        text: "Close",
                        icon: merger.media.closeIcon(),
                        onClick: function () {
                            merger.leave();
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
                ],
                windows: [merger.ui.window("Wmain", {
                    title: "Error",
                    width: 400,
                    height: 250,
                    visible: false,
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
                        width: 400 - 37,
                        height: 32,
                        text: "",
                    }),
                    merger.ui.label("Tinfo", {
                        top: 37,
                        left: -5,
                        width: 400,
                        height: 250 - 37 - 25 - 10,
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
                        top: 250 - 20,
                        left: 400 - 35,
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
                        //merger.leave();
                    },
                    setError: function (message, data) {
                        this.content.Lerror.setText(message);
                        this.content.Tinfo.setText(data);
                    }
                }), merger.ui.window("Wconsole", {
                    title: "Console",
                    width: 500,
                    height: 350,
                    visible: false,
                    content: [
                        merger.ui.html("Hconsole", {
                            top: 0,
                            left: 0,
                            width: 500,
                            height: 330,
                            style: {
                                overflow: "scroll",
                            },
                        }),
                        merger.ui.textbox("Tinput", {
                            top: 330,
                            left: -5,
                            width: 500 + 10,
                            height: 25,
                            placeholder: "javascript code here",
                            //multiple: true,
                            style: {
                                whiteSpace: "pre",
                                fontFamily: "Lucida Console, Monospace",
                                border: "0",
                                overflow: "scroll",
                                background: "#EEE",
                                padding: "5px",
                            },
                            onkeydown: function (e) {
                                if (e.keyCode == 13) {
                                    this.getWindow().exec(this.getText());
                                    this.setText("");
                                    return false;
                                }
                            },
                        }),
                    ],
                    onClose: function () {
                        this.hide();
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
                                d.appendChild(objectResumeLink(object));
                                d.style.borderBottom = "1px solid #EEE";
                                head.appendChild(document.createTextNode("<"));
                                head.style.color = "#DDD";
                                break;
                            case 'e':
                                d.appendChild(errorLink(object));
                                //d.innerText = object;
                                head.appendChild(document.createTextNode("!"));
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
                        var err, obj;
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
                    }
                })],
                onLoad: function () {
                },
                onAbout: function () {
                    merger.dialogs.messageBox(this, "Inquirer v" + VERSION + " ©2016-2017 XWolf Override.<br>Debugger application layer for web pages. Useful for embedded browser debugging", "About Inquirer", null, this.icon, 100);
                },
                showError: function (err) {
                    if (err instanceof Error) {
                        this.windows.Wmain.setError(err.message, err.stack);
                    } else {
                        this.windows.Wmain.setError(err.message, JSON.stringify(err, null, 2));
                    }
                    this.windows.Wmain.show();
                },
                showConsole: function () {
                    this.windows.Wconsole.show();
                }
            });
        return inqapp;
    }

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
            inq.error({
                message: message,
                source: source,
                at: lineno + ":" + colno,
                error: err,
                raw: arguments
            });
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
        var wcon = getApp().windows.Wconsole;
        if (!window.console)
            window.console = {};
        function consoleOverride(method, funct) {
            var old = window.console[method];
            window.console[method] = function () {
                funct.apply(this, arguments);
                if (old)
                    old.apply(this, arguments);
            };
            window.console[method].old = old;
        }
        consoleOverride("log", function () {
            wcon.write.apply(wcon, arguments);
        })
        consoleOverride("debug", function () {
            wcon.write.apply(wcon, arguments);
        })
        consoleOverride("error", function () {
            wcon.writeError.apply(wcon, arguments);
        })
    }

    // Install hooks
    function hook() {
        hookOnError();
        hookKonamiCode();
        hookConsole();
    }

    function error(error) {
        getApp().windows.Wconsole.writeError(error);
        if (this.autoShow) {
            getApp().showError(error);
            show();
        }
    }

    function inspect(object) {

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
        autoShow: true,     // Open Inquirer environment when a new unhandled error happen
        show: show,         // Enters environment
        hide: hide,         // Exit environent
        hook: hook,         // Hook the webpage to control errors (Automatically hooked)
        error: error,       // Collect an error and if autoShow is true enters environment
        inspect: inspect,   // Enters environment and open variable inspector
        console: console,   // Enters environment and open inquirer console
        log: log,           // Log an object into the console
    });

    // Hook the page now
    hook();
    window.addEventListener("load", function () {
        getApp().windows.Wconsole.write("Inquirer " + VERSION + " console.");
    })
}();
