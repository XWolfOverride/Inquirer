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

            });
        return inqapp;
    }

    function show() {
        getApp().show();
        jsTK.desktop();
        var w = jsTK.get("Werror");
        if (!w) {
            w = jsTK.window("Werror", {
                title: "Error",
                width: 400,
                height: 200,
                content: [jsTK.label("Lerror", {
                    top: 30,
                    left: 10,
                    text: "---"
                }), jsTK.list("Lerrors", {
                    top: 80,
                    left: 10,
                    width: 320,
                    height: 100,
                }), jsTK.button("Bok", {
                    top: 80,
                    left: 10,
                    width: 320,
                    height: 100,
                    text: "Ok",
                    onClick: function () {
                    }
                })]
            });
        }
    }

    function hide() {
        jsTK.close();
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
        if (this.autoShow)
            show();
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
