/*
 * Merger Tester Applicaion V 0.2
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

(function () {
    var app;

    function openResizeTestWindow() {
        var wwidth = 400, wheight = 150;
        app.getOrCreateWindow("resizer", function () {
            return {
                title: "Resizable window",
                width: wwidth,
                height: wheight,
                resizable: true,
            }
        }).show();
    }

    function openControlTestWindow() {
        var wwidth = 400, wheight = 200;
        app.getOrCreateWindow("controls", function () {
            return {
                title: "Control Dialog",
                width: 400,
                height: 200,
                content: [merger.ui.picture("Iico", {
                    src: "http://simpleicon.com/wp-content/uploads/rocket.svg",
                    top: 0,
                    left: 0,
                    width: 48,
                    height: 48,
                }),
                merger.ui.label("Linfo", {
                    top: 20,
                    left: 55,
                    width: 95,
                    height: 25,
                    text: "Control samples.",
                }),
                merger.ui.textbox("sample_textbox", {
                    top: 55,
                    left: 0,
                    width: 150,
                    text: "Textbox",
                }),
                merger.ui.checkbox("sample_checkbox", {
                    top: 75,
                    left: 0,
                }),
                merger.ui.label("sample_checkbox_label", {
                    top: 75,
                    left: 20,
                    text: "Checkbox",
                }),
                merger.ui.dropdown("sample_dropdown", {
                    top: 95,
                    left: 0,
                    width: 150,
                    items: [{ key: "clRed", value: "Red" }, { key: "clBlue", value: "Blue" }, { key: "clGreen", value: "Green" }],
                }),
                merger.ui.list("sample_list", {
                    top: 120,
                    left: 0,
                    width: 150,
                    height: 80,
                    items: [{ key: "clRed", value: "Red" }, { key: "clBlue", value: "Blue" }, { key: "clGreen", value: "Green" }],
                }),
                merger.ui.button("Bok", {
                    top: 200 - 20,
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
                    this.content.Tinfo.setText(JSON.stringify(data, null, 2));
                }
            }
        }).show();
    }

    app = merger.app("mTester", {
        title: "Merger Tester Application",
        // appMenu: [
        //     merger.ui.menuItem("app_close", {
        //         text: "Close Merger Desktop",
        //         icon: merger.media.closeIcon(),
        //         onClick: function () {
        //             merger.leave();
        //         }
        //     }),
        // ],
        menu: [
            merger.ui.menuItem("m_test", {
                text: "Test",
                items: [merger.ui.menuItem("mt_controls", {
                    text: "Test Controls Dialog",
                    onClick: openControlTestWindow,
                }), merger.ui.menuItem("mt_resize", {
                    text: "Test Resize Window",
                    onClick: openResizeTestWindow,
                })
                ]
            }),
        ],
        onLoad: function () {
        },
        onAbout: function () {
            merger.dialogs.messageBox(app, "MergerTester ©2017-2018 XWolf Override.<br>Merger desktop is a framework that mimiks a classic desktop over a webpage, and allows development of desktop look and feel web applications. 🐉", "About merger", null, this.icon);
        },
    });

})();

