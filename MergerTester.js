/*
 * Merger Tester Applicaion V 0.2
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

var mTester = merger.app("mTester", {
    title: "Merger Tester Application",
    appMenu: [
        merger.ui.menuItem("app_close", {
            text: "Close Merger Desktop",
            icon: merger.media.closeIcon(),
            onClick: function () {
                merger.leave();
            }
        }),
    ],
    menu: [
        merger.ui.menuItem("m_test", {
            text: "Test",
            items: [merger.ui.menuItem("mt_controls", {
                text: "Test Controls Dialog",
                onClick:function(){
                    this.getApplication().windows.controls.show();
                }
            })
            ]
        }),
    ],
    windows: [merger.ui.window("controls", {
        title: "Control Dialog",
        width: 200,
        height: 200,
        content: [merger.ui.picture("Iico", {
            src: "https://cdn1.iconfinder.com/static/e9bcefc0c5591114fcd0b4b0aff67962/assets/img/extended-library/icon.svg",
            top: 0,
            left: 0,
            width: 32,
            height: 32,
        }),
        merger.ui.label("Linfo", {
            top: 20,
            left: 40,
            width: 400 - 37,
            height: 32,
            text: "Control samples dialog.",
        }),
        merger.ui.button("Bok", {
            top: 200 - 20,
            left: 200 - 35,
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
    })],
    onLoad: function () {
    },
    onAbout: function () {
    },
});
