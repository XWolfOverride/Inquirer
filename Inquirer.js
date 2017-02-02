/*
 * Web Inquirer V 0.2
 * Copyright 2016 XWolfOVerride@gmail.com
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

    var icon = "data:image/gif;base64,R0lGODlhIAAgAKECADIyMjMzM////////yH5BAEKAAIALAAAAAAgACAAAAJulI8Zke2PFoC0LlZzW7qf633XGGHeiJqcaKWgsQov5JLvTNeYq+kM36vBUJNgaujDiVDIpLK58ylIiiU0NjWVZscHgAuUUXPOpfbhjD1bwmFIrHsvv+3Qrd4Byzda7N7h9zclmEOIFmgolgj4VgAAOw==",
        bugico = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAWlBMVEUkJSMuMC01NzQ+Pz1HSEZPUU5YWldfYV5pa2h6e3iOkI2YmpeipKGpq6ifwFWqxma4urezzHa50YHJy8jC1pLL3aLS4K3a3NnZ5rvo6+fn8NXv8+L19/D9//y9fxQqAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+EBBAwFN28edE4AAABVaVRYdENvbW1lbnQAAAAAAENvcHlyaWdodCBJTkNPUlMgR21iSCAod3d3Lmljb25leHBlcmllbmNlLmNvbSkgLSBVbmxpY2Vuc2VkIHByZXZpZXcgaW1hZ2VYrophAAAC6UlEQVRYw+2X2barIAxA0U5qK2jFAor//5uXSUUS2q5z1n07vNhC2JCYSbL8cpA/wAeAGswQPwc0xI3qO4BWcPVs95/gvNYQIAhpgGBtATcw3RLSpgBtRYdU8oLeQNhZlQCUnazDny7YrfM2uK8Hh+fDTopUBavuOfwuH+4xlB5QdP5vEU69xdfaAMOONT8fQg012UY1CNGuV1HxraK3UGw6XEhm+BveYw0igNWh3OyJD6fD1WqF+EG7glUeYJdFEWsQe6I1WTG8BdjVMn6JB8DNvXTjY12R2X9HnDMCqNPqSxmCebl6UWatFHgwmdtdl4XzoGcyrHav3rp3IXLRqEq9SEqf5qQq3X8xao+UjstyEvlwNgZglNLePMX9FJ1e203cLDEn9CYfvKgdTLqgaWsDKa6NM4xkbol/SCheyiBek4+8zh04yz4sUP0WMNN9sHHywrNk0bR8C+jpYbDcXBZAEWGWTM5vAHMiSzGAzAH8i4aAdM46GgSI7lrAw5zJKdSrvLRJSmtc9tWprNUXm6z3akH29N0sE5CdELsYI7hse90BPvt1OABOjiFlXFeA338WNpCgxSGAL9qnzUo7gK+ANp+Cl0BfC0J9bmXTEEioHi4fc+S2GUAgNAZQ7zWJI7cN8QkAPrvfDGDYaxrHZMcMwFW4u7VBV3fBKaBs/wZgNrZJLEB1WUavTDBN3wFeWcD8HUDmwxkDPCkWYWg4KyjMQEKyhtVoYVGnFhoBA0hTdwQEmLJUwYTA0BzRuDKVAEzRNS2M/AwYF20KX6HTjBQcugc5jYELtD74j4C1b5kBAGaIQ0dHou7ihnhjCuBrAiqOABHqPwiIWSNePEQ6kEgDhYTUNCNRoEmaVF3jsvXEcSmU0zG97D10GQOcBu3eJjAMwOZjt9ylAIEF9ktiMWg9IbTmZLvT/dirhI08ZLTx2BaYNqxKHAl+2EgbWtyatJcafAyJbz555rHvOePTb77atP77cv3/gH8Wkk7NciByTQAAAABJRU5ErkJggg==";


    // Locals

    var formerOnError;
    var inq = this;
    var inqapp;

    // Methods

    function getApp() {
        if (!inqapp)
            inqapp = merger.app("inquirer", {
                title: "Inquirer",
                icon: icon,
                appMenu: [
                    merger.ui.menuItem("app_close", {
                        text: "Close",
                        onClick: function () {
                            merger.leave();
                        }
                    }),
                ],
                menu: [
                    merger.ui.menuItem("app_main", {
                        text: "Inquirer",
                        items: [merger.ui.menuItem("app_close", {
                            text: "Close",
                            onClick: function () {
                                merger.leave();
                            }
                        }),
                        ],
                    }),
                    merger.ui.menuItem("app_tools", {
                        text: "Tools",
                        items: [merger.ui.menuItem("tool_console", {
                            text: "Console",
                        })
                        ]
                    }),
                    merger.ui.menuItem("test4", {
                        text: "Colors",
                        items: [merger.ui.menuItem("test4_s1", {
                            text: "Black",
                        }), merger.ui.menuItem("test4_s2", {
                            text: "Red",
                        }), merger.ui.menuItem("test4_s3", {
                            text: "Green",
                        }), merger.ui.menuItem("test4_s4", {
                            text: "Yellow",
                        }), merger.ui.menuItem("test4_s5", {
                            text: "To decide by customer",
                            items: [merger.ui.menuItem("test4_s5_1", {
                                text: "Accept",
                            }), merger.ui.menuItem("test4_s5_2", {
                                text: "Declite",
                            }), merger.ui.menuItem("test4_s5_3", {
                                text: "Wait More",
                                onClick: function () {
                                    alert("madofaka!");
                                }
                            }),
                            ],
                        }), merger.ui.menuItem("test4_s6", {
                            text: "White",
                        }),
                        ],
                    }),
                ],
                windows: [merger.ui.window("Wmain", {
                    title: "Error",
                    width: 400,
                    height: 250,
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
                        merger.leave();
                    },
                    setError: function (message, data) {
                        this.content.Lerror.setText(message);
                        this.content.Tinfo.setText(JSON.stringify(data, null, 2));
                    }
                })],
                mainWindow: "Wmain",
                onLoad: function () {

                },
                onAbout: function () {
                    alert("Pos claro");
                },
                showError: function (message, data) {
                    this.windows.Wmain.setError(message, data);
                },
                log: function (info) {

                }
            });
        return inqapp;
    }

    function show() {
        getApp().focus();
    }

    function hide() {
        getApp().windows.Wmain.close();
    }

    function hook() {
        // On error code controller
        formerOnError = window.onerror;
        window.onerror = function (message, source, lineno, colno, err) {
            error.bind(inq)(message, {
                "source": source,
                "at": lineno + ":" + colno,
                "error": err,
                "raw": arguments
            });
            formerOnError;
        }
        // Konami code controller
        var ckc = (function (callback) {
            var kc = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Konami code
            var kcindex = 0;
            return function (e) {
                if (e.keyCode == kc[kcindex])
                    kcindex++;
                else
                    kcindex = 0;
                if (kcindex == kc.length)
                    callback();
            }
        })(function () {
            this.show();
        }.bind(this));
        document.addEventListener("keydown", ckc, false);
    }

    function error(message, data) {
        getApp().log({ error: true, data: { message: message, data: data } });
        if (this.autoShow) {
            getApp().showError(message, data);
            show();
        }
    }

    function inspect() {

    }

    function console() {

    }

    function log() {

    }
    // Publish
    /** Open Inquirer environment when a new unhandled error happen */
    this.autoShow = true;

    /** Enters environment */
    this.show = show;

    /** Exit environent */
    this.hide = hide;

    /** Hook the webpage to control errors (Automatically hooked) */
    this.hook = hook;

    /** Collect an error and if autoShow is true enters environment */
    this.error = error;

    /** Enters environment and open variable inspector */
    this.inspect = inspect;

    /** Enters environment and open inquirer console */
    this.console = console;

    /** Log an object into the console */
    this.log = log;

    // Hook the page now
    hook();

    window.addEventListener("load",function(){
            getApp();
    })
} ();
