var inquirer = inquirer || new function () {

    // Toolkit
    var jsTK = new function () {
        var icon = "R0lGODlhIAAgAKECADIyMjMzM////////yH5BAEKAAIALAAAAAAgACAAAAJulI8Zke2PFoC0LlZzW7qf633XGGHeiJqcaKWgsQov5JLvTNeYq+kM36vBUJNgaujDiVDIpLK58ylIiiU0NjWVZscHgAuUUXPOpfbhjD1bwmFIrHsvv+3Qrd4Byzda7N7h9zclmEOIFmgolgj4VgAAOw==";

        if (!Object.prototype.merge)
            Object.defineProperty(Object.prototype, "merge", {
                writable: true, value: function (src) {
                    if (src != undefined)
                        for (var key in src)
                            this[key] = src[key];
                    return this;
                }
            });

        var ui = {
            w: {}
        };

        function desktop() {
            if (!ui.dsk) {
                ui.dsk = document.createElement("div");
                ui.dsk.style.merge({
                    position: "absolute",
                    zIndex: 510,
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    fontFamily: "Verdana",
                    fontSize: "10px",
                    overflow: "hidden",
                });
                ui.bg = document.createElement("div");
                ui.bg.style.merge({
                    backgroundColor: "gray",
                    opacity: 0.3,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                });
                ui.dsk.appendChild(ui.bg);
                ui.menu = document.createElement("div");
                ui.menu.style.merge({
                    position: "absolute",
                    zIndex: 512,
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "21px",
                    padding: "2px 9px 2px 9px",
                    backgroundColor: "white",
                    borderBottom: "1px solid black",
                    boxSizing: "border-box",
                });
                ui.menu.sysMenu = document.createElement("img");
                ui.menu.sysMenu.style.width = "16px";
                ui.menu.sysMenu.style.height = "16px";
                ui.menu.sysMenu.src = "data:image/gif;base64," + icon;
                ui.menu.appendChild(ui.menu.sysMenu);
                ui.dsk.appendChild(ui.menu);
            }
            if (!document.body.contains(ui.dsk))
                document.body.appendChild(ui.dsk);
        }

        function close() {
            if (document.body.contains(ui.dsk))
                document.body.removeChild(ui.dsk);
        }

        function control(id, def, c) {
            if (!c)
                c = document.createElement("div");
            c.setAttribute("id", id);
            c.style.position = "absolute";
            c.setTop = function (val) {
                def.top = val;
                this.style.top = val + "px";
            }
            c.setLeft = function (val) {
                def.left = val;
                this.style.left = val + "px";
            }
            c.setWidth = function (val) {
                def.width = val;
                this.style.width = val + "px";
            }
            c.setHeight = function (val) {
                def.height = val;
                this.style.height = val + "px";
            }
            c.setVisible = function (val) {
                this.style.display = val ? "" : "none";
            }
            c.setContent = function (ctt) {
                for (var i = 0; i < ctt.length; i++)
                    this.appendChild(ctt[i]);
            }
            c.setStyle = function (style) {
                this.style.merge(style);
            }
            var settings = {};
            for (var key in def) {
                var mdata = def[key];
                if (typeof mdata == "function")
                    c[key] = def[key];
                else {
                    var fname = "set" + key[0].toUpperCase() + key.substring(1);
                    var fnc = c[fname];
                    if (fnc && typeof fnc == "function")
                        settings[key] = { f: fnc.bind(c), d: mdata };
                }
            }
            for (var key in settings) {
                var o = settings[key];
                o.f(o.d);
            }
            return c;
        }

        function window(id, def) {
            if (def.top == undefined)
                def.top = (ui.dsk.clientHeight - def.height) / 2;
            if (def.left == undefined)
                def.left = (ui.dsk.clientWidth - def.width) / 2;
            if (!def.content)
                def.content = [];
            var w;
            // Window Title
            var wt = control("title", {
                title: def.title,
                visible: !def.hideTitle,
                style: {
                    borderBottom: "1px solid black",
                    textAlign: "center",
                    height: "18px",
                    boxSizing: "border-box",
                    fontFamily: "Chicago, Verdana",
                    fontSize: "12px",
                    fontWeight: "bold",
                    backgroundColor: "#F0F0F6",
                    position: "relative",
                    boxShadow: "0 0 1px #A5A5D6 inset",
                    paddingTop: "1px",
                },
                content: [
                    control("closeButton", {
                        visible: !def.hideCloseButton,
                        style: {
                            top: "2px",
                            left: "6px",
                            width: "10px",
                            height: "10px",
                            border: "2px groove #EFEFEF",
                            backgroundColor: "#DFDFEF",
                        },
                        onclick: function () {
                            w.close();
                        }
                    })//, document.createElement("button"))
                ],
                setTitle: function (title) {
                    if (!this._textNode) {
                        this._textNode = document.createTextNode("");
                        this.appendChild(this._textNode);
                    }
                    this._textNode.textContent = title;
                }
            });
            // Window client
            var wc = control("client", {
                content: def.content,
                style: { position: "relative" }
            });
            def.content = [wt, wc];
            // Window root
            w = control(id, {
                setTitle: function (title) {
                    wt.setTitle(title);
                },
                style: {
                    backgroundColor: def.bg == undefined ? "white" : def.bg,
                    border: "1px solid black",
                    boxShadow: "1px 1px 0px rgba(0,0,0,0.5)",
                    overflow: "hidden",
                }
            }.merge(def));
            ui.dsk.appendChild(w);
            ui.w[id] = w;
            return w;
        }

        function label(id, def) {
            var c = control(id, def);
            c.setText = function (text) {
                this.innerText = text;
            }
            c.setText(def.text);
            return c;
        }

        function list(id, def) {
            var c = control(id, def);
            c.style.border = "1px solid red";
            return c;
        }

        function get(id) {
            return ui.w[id];
        }

        this.desktop = desktop;
        this.close = close;
        this.window = window;
        this.get = get;
        this.list = list;
        this.label = list;
        this.button = list;
    }

    // Locals

    var formerOnError;
    var inq = this;

    // Methods

    function show() {
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
