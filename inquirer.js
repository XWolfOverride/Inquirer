var inquirer = inquirer || new function () {

    var icon = "data:image/gif;base64,R0lGODlhIAAgAKECADIyMjMzM////////yH5BAEKAAIALAAAAAAgACAAAAJulI8Zke2PFoC0LlZzW7qf633XGGHeiJqcaKWgsQov5JLvTNeYq+kM36vBUJNgaujDiVDIpLK58ylIiiU0NjWVZscHgAuUUXPOpfbhjD1bwmFIrHsvv+3Qrd4Byzda7N7h9zclmEOIFmgolgj4VgAAOw==";

    // Locals

    var formerOnError;
    var inq = this;
    var inqapp;

    // Methods

    function getApp() {
        if (!inqapp)
            inqapp = merger.app("inquirer", {
                title: "inquirer",
                icon: icon,
                windows: [merger.ui.window("Wmain", {
                    title: "Error",
                    width: 400,
                    height: 250,
                    content: [merger.ui.label("Lerror", {
                        top: 10,
                        left: 10,
                        text: "---"
                    }),
                    merger.ui.button("Bok", {
                        top: 200,
                        left: 355,
                        text: "Ok",
                        onClick: function (e) {
                            this.getWindow().close();
                        }
                    }),
                    merger.ui.textbox("Tinfo", {
                        top: 25,
                        left: 10,
                        width: 340,
                        height: 190,
                        multiple: true,
                        style: {
                            whiteSpace: "pre",
                        }
                    })
                    ],
                    onClose: function () {
                        merger.leave();
                    },
                    setError: function (message, data) {
                        this.client.Lerror.setText(message);
                        this.client.Tinfo.setText(JSON.stringify(data, null, 2));
                    }
                })],
                mainWindow: "Wmain",
                onLoad: function () {

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

} ();
