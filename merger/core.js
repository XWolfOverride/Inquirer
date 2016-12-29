var merger = new function () {

    /**
     * merger system variables
     */
    var sys = {
        icon: "data:image/gif;base64,R0lGODlhIAAgAOMAAP///zOZ/47N8FxqpgAAAMzM/7+/v9nu+QBjpAA9hP///////////////////////yH5BAEKAA8ALAAAAAAgACAAAATq8MlJH7k16y3JEQXGjZVXBGBIkKQpoEIqsuVRxHAsr3Rn6zndjuYCCo8F1ahoPCJDG2bTKbTxKNIpVWAbXH03atDZ9ZYKh49zXC0M3l/LKZA+Bthc99uMnd/rLzhBZXtxBH53dGpAKISFZ4mJCIpHjo99kQGTiWmdbgkJe3AGmJKZdwUPem+ghQavHX6bpyABoqyhBK+wh3ezpwGrtwMJurtymsCRwsPGpHK/ysyizhME0dLDo7DWBMqZ017HFQYX36jN4xrl3tnU6hzswMLVPfLLrtw9EvfB28/7KMhzUy9gBnYFDa6DtyECADs=",
        ver: "0.2",
    };

    /**
     * merge method the root of all merger framework
     */
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
        app: {},
        w: {}
    };

    /**
     * Toolbar clock logic
     */
    function clockTick() {
        var now = new Date();
        var h = now.getHours();
        var m = now.getMinutes();
        if (h < 10) h = "0" + h;
        if (m < 10) m = "0" + m;
        ui.menu.time.innerText = h + ":" + m;
    }

    // ---- Tools

    /**
     * Tool for trigger creation
     * USE: insist(<controller>)
     * 
     * controller.when: function to check triggering.
     *                      The first time the when returns true the "do"" method will be executed
     * controller.do:   function with logic to execute when "when" method returns true
     * controller.each: (optional) integer with milliseconds to wait between checks.
     *                      If not set, a continious check will be done. WARNING: this can consume a lot of CPU.
     */
    function insist(ctrl) {
        var controller = {
            when: function () {
                return true;
            },
            do: function () {
            },
            each: undefined
        }.merge(ctrl);
        controller.check = function () {
            if (!this.when())
                setTimeout(this.check.bind(this), this.each);
            else
                this.do();
        }
        controller.check();
    }

    // ---- UI implementation    
    // ----------------------        

    /**
     * Tool for creating tags
     */
    function mkTag(tag) {
        return document.createElement(tag);
    }

    /**
     * Tool for injecting CSS rules
     */
    function mkCSS(css) {
        style = mkTag('style');
        if (style.styleSheet)
            style.styleSheet.cssText = css;
        else
            style.appendChild(document.createTextNode(css));
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    /**
     * Open merger desktop.
     * The first time finish the basic layout creation
     */
    function openDesktop() {
        if (!ui.dsk.merger_init) {
            ui.dsk.merger_init = true;
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
            ui.menu.sysMenu = mkTag("img");
            ui.menu.sysMenu.style.merge({
                width: "16px",
                height: "16px",
                float: "left",
            });
            ui.menu.sysMenu.src = sys.icon;
            ui.menu.client = mkTag("div");
            ui.menu.client.style.merge({
                float: "left",
                fontFamily: "Arial",
                fontSize: "14px",
                lineHeight: "16px",
            });
            ui.menu.time = mkTag("div");
            ui.menu.time.style.merge({
                width: "40px",
                float: "right",
                fontFamily: "Arial",
                fontSize: "14px",
                lineHeight: "16px",
            });
            ui.menu.appendChild(ui.menu.sysMenu);
            ui.menu.appendChild(ui.menu.client);
            ui.menu.appendChild(ui.menu.time);
            clockTick();
            setInterval(clockTick, 60000);
        }
        document.body.appendChild(ui.dsk);
    }

    /**
     * Base control creation
     */
    function control(type, id, def, c) {
        if (!c)
            c = mkTag("div");
        c.setAttribute("merger_type", type);
        c.setAttribute("id", id);
        c.setAttribute("name", id);
        c.style.position = "absolute";
        c._type = type;
        c.getId = function () {
            return id;
        }
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
            _visible = val;
            if (val && this.onShow)
                this.onShow();
            if (val && this.onHide)
                this.onHide();
            if (this.onVisibilityChanged)
                this.onVisibilityChanged();
        }
        c.getVisible = function () {
            return this.style.display != "none";
        }
        c.show = function () {
            this.setVisible(true);
        }
        c.hide = function () {
            this.setVisible(false);
        }
        c.append = function (control) {
            this.appendChild(control);
            this[control.getId()] = control;
            control.parent = this;
        }
        c.setContent = function (ctt) {
            for (var i = 0; i < ctt.length; i++)
                this.append(ctt[i]);
        }
        c.setStyle = function (style) {
            this.style.merge(style);
        }
        c.getWindow = function () {
            var win = this;
            while (win && win._type != "window")
                win = win.parent;
            return win;
        }
        c.getApp = function () {
            return this.getWindow().parent;
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
        // What hapens with value W/O setters?
        for (var key in settings) {
            var o = settings[key];
            o.f(o.d);
        }
        if (c.onControlCreate)
            c.onControlCreate();
        return c;
    }

    /**
     * Menú Item control creation
     */
    function menuItem(id, def) {
        var m = mkTag("div").merge({

        });
    }

    /**
     * Window control creation
     */
    function window(id, def) {
        if (typeof (def) != "object")
            def = {};
        if (def.height == undefined)
            def.height = 300;
        if (def.width == undefined)
            def.width = 450;
        if (def.top == undefined)
            def.top = (document.body.clientHeight - def.height) / 2;
        if (def.left == undefined)
            def.left = (document.body.clientWidth - def.width) / 2;
        if (!def.content)
            def.content = [];
        var w;
        // Window Title
        var wt = control("windowtitle", "windowtitle", {
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
                control("windowclosebutton", "closeButton", {
                    visible: !def.hideCloseButton,
                    style: {
                        top: "2px",
                        left: "6px",
                        width: "9px",
                        height: "9px",
                        border: "2px groove #EFEFEF",
                        backgroundColor: "#DFDFEF",
                        padding: 0,
                        boxSizing: "content-box",
                    },
                    onclick: function () {
                        w.close();
                    },
                }, document.createElement("button"))
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
        var wc = control("windowclient", "client", {
            content: def.content,
            style: { position: "relative" }
        });
        def.content = [wt, wc];
        // Window root
        w = control("window", id, {
            setTitle: function (title) {
                wt.setTitle(title);
            },
            style: {
                backgroundColor: def.bg == undefined ? "white" : def.bg,
                border: "1px solid black",
                boxShadow: "1px 1px 0px rgba(0,0,0,0.5)",
                overflow: "hidden",
            },
            close: function () {
                var close = true;
                if (this.onClose)
                    close = this.onClose();
                if (close)
                    this.hide();
            }
        }.merge(def));
        ui.dsk.appendChild(w);
        ui.w[id] = w;
        return w;
    }

    /**
     * Picture control creation
     */
    function picture(id, def) {

    }

    /**
     * Label control creation
     */
    function label(id, def) {
        var c = control("label", id, {
            setText: function (text) {
                this.innerText = text;
            }
        }.merge(def));
        if (def.text !== undefined)
            c.setText(def.text);
        return c;
    }

    /**
     * TextBox control creation
     */
    function textbox(id, def) {
        def.style = {
            fontSize: "10px",
            fontFamily: "Lucida Console, Monospace"
        }.merge(def.style);
        var c = control("textbox", id, {
            setText: function (value) {
                this.value = value;
            }
        }.merge(def), mkTag(def.multiple ? "textarea" : "input"));
        return c;
    }

    /**
     * Button control creation
     */
    function button(id, def) {
        var c = control("button", id, def, mkTag("button"));
        c.setText = function (text) {
            this.innerText = text;
        }
        c.setText(def.text);
        c.addEventListener("click", function () { if (this.onClick) this.onClick.apply(this, arguments) }, false);
        return c;
    }

    /**
     * List control creation
     */
    function list(id, def) {
        var c = control("list", id, def);
        c.style.border = "1px solid red";
        return c;
    }

    /**
     * Component path getter
     */
    function get(id) {
        return ui.w[id];
    }

    // ---- Kernel implementation    
    // --------------------------

    function kSwitchApp(app) {
        ui.menu.sysMenu.src = app.icon ? app.icon : sys.icon;
    }

    /**
     * Application creation
     */
    function app(id, def) {
        if (ui.app[id])
            throw new Error("Application '" + id + "' already exists");
        var a = {}, windows = def.windows, i;
        ui.app[id] = a;
        a.merge({
            _type: "app",
            getId: function () {
                return id;
            },
            title: id,
            windows: {},
            menu: undefined,
            onLoad: function () {

            },
            show: function () {
                openDesktop();
                if (this.mainWindow)
                    this.mainWindow.show();
            },
            focus: function () {
                this.show();
                kSwitchApp(this);
                if (this.mainWindow)
                    this.mainWindow.focus();
                if (this.onEnter)
                    this.onEnter();
            }
        });
        delete (def.windows);
        a.merge(def);
        if (windows)
            for (i = 0; i < windows.length; i++) {
                var win = windows[i];
                a.windows[win.getId()] = win;
                win.parent = a;
            }
        if (a.mainWindow)
            a.mainWindow = a.windows[a.mainWindow];
        if (a.onLoad)
            a.onLoad();
        return a;
    }

    function enter() {
        openDesktop();
    }


    function leave() {
        if (document.body.contains(ui.dsk))
            document.body.removeChild(ui.dsk);
    }

    /**
     * merger API
     */
    // -- Kernel
    this.merge({
        app: app,
        enter: enter,
        leave: leave,
        version: sys.ver,
        // -- UI
        ui: {
            window: window,
            get: get,
            list: list,
            label: label,
            textbox: textbox,
            button: button,
        }
    });

    /**
     * Initializes merger subsystem
     */
    function kInit() {
        ui.dsk = mkTag("div");
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
            backgroundColor: "rgba(128,128,128,0.3)",
        });
        ui.menu = mkTag("div");
        ui.dsk.appendChild(ui.menu);

    }

    kInit();
}

/**
 * Test app
 */
merger.app("merger", {

});
