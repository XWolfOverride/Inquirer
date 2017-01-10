var merger = new function () {

    /**
     * merger system variables
     */
    var sys = {
        icon: "data:image/gif;base64,R0lGODlhIAAgAOMAAP///zOZ/47N8FxqpgAAAMzM/7+/v9nu+QBjpAA9hP///////////////////////yH5BAEKAA8ALAAAAAAgACAAAATq8MlJH7k16y3JEQXGjZVXBGBIkKQpoEIqsuVRxHAsr3Rn6zndjuYCCo8F1ahoPCJDG2bTKbTxKNIpVWAbXH03atDZ9ZYKh49zXC0M3l/LKZA+Bthc99uMnd/rLzhBZXtxBH53dGpAKISFZ4mJCIpHjo99kQGTiWmdbgkJe3AGmJKZdwUPem+ghQavHX6bpyABoqyhBK+wh3ezpwGrtwMJurtymsCRwsPGpHK/ysyizhME0dLDo7DWBMqZ017HFQYX36jN4xrl3tnU6hzswMLVPfLLrtw9EvfB28/7KMhzUy9gBnYFDa6DtyECADs=",
        ver: "0.3",
        color: {
            frame: "teal",
            //frame:"orange",
            framecontrast: "white",
            text:"black",
            windowtitle:"black",
            selection: "lightskyblue",
        },
    };

    /**
     * merge method the root of all merger framework
     */
    if (!Object.prototype.merge)
        Object.defineProperty(Object.prototype, "merge", {
            writable: true, value: function (src) {
                if (!src)
                    return this;
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
     * Function to merge control definition preserving style
     */
    function mkDefinition(a, b) {
        if (a.style)
            b.style = a.style.merge(b.style);
        return a.merge(b);
    }

    /**
     * Drag'N'Drop system
     */

    var DragNDrop = new (function () {
        var item, point;

        this.merge({
            drag: function (i, x, y) {
                if (item)
                    this.drop();
                item = i;
                point = { x: x, y: y };
            },
            drop: function (ctl) {
                if (!ctl)
                    item = null;
                else
                    if (item == ctl)
                        item = null;
            },
            dragging: function () {
                return item ? true : false;
            },
            update: function (x, y) {
                item.merge({
                    top: y - point.y,
                    left: x - point.x,
                })
            }
        });
    })();

    /**
     * Open merger desktop.
     * The first time finish the basic layout creation
     */
    function openDesktop() {
        if (!ui.dsk.merger_init) {
            ui.dsk.merger_init = true;
            ui.dsk.onmousemove = function (e) {
                if (DragNDrop.dragging())
                    DragNDrop.update(e.clientX, e.clientY);
            }
            ui.menu.style.merge({
                position: "absolute",
                zIndex: 512,
                top: 0,
                left: 0,
                width: "100%",
                height: "21px",
                padding: "0px 5px 0px 5px",
                backgroundColor: "white",
                borderBottom: "1px solid " + sys.color.frame,
                boxSizing: "border-box",
            });
            ui.menu.sysMenu = mkTag("img");
            ui.menu.sysMenu.style.merge({
                width: "16px",
                height: "16px",
                float: "left",
                padding: "2px 4px 2px 4px",
            });
            ui.menu.sysMenu.merge({
                onmouseenter: function () {
                    this.style.backgroundColor = sys.color.frame;
                },
                onmouseleave: function () {
                    this.style.backgroundColor = "";
                }
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
                float: "right",
                fontFamily: "Arial",
                fontSize: "14px",
                lineHeight: "16px",
                padding: "2px 4px 2px 4px",
                color: sys.framecolor,
            });
            ui.menu.appendChild(ui.menu.sysMenu);
            ui.menu.appendChild(ui.menu.client);
            ui.menu.appendChild(ui.menu.time);
            ui.menu.style.merge({
                userSelect: "none",
            })
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
        c._type = type;
        c.content = {};
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
            this.content[control.getId()] = control;
            control.parentControl = this;
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
                win = win.parentControl;
            return win;
        }
        c.getApp = function () {
            return this.getWindow().parent;
        }
        c.merge = function (def) {
            var settings = {};
            for (var key in def) {
                var mdata = def[key];
                if (typeof mdata == "function")
                    c[key] = def[key];
                else {
                    var fname = "set" + key[0].toUpperCase() + key.substring(1);
                    var fnc = c[fname];
                    settings[key] = {
                        f: (fnc && typeof fnc == "function") ? fnc.bind(this) : null, d: mdata
                    };
                }
                for (var key in settings) {
                    var o = settings[key];
                    if (o.f)
                        o.f(o.d);
                    else
                        this[key] = o.d;
                }
            }
        }
        c.merge(mkDefinition({
            style: {
                position: "absolute",
            },
            anchor: { top: true, right: false, bottom: false, left: true },
        }, def));
        if (c.onControlCreate)
            c.onControlCreate();
        return c;
    }

    /**
     * Menú Item control creation
     */
    function menuItem(id, def) {
        var m = control("menu", id, mkDefinition({
            style: {
                position: "",
                display: "inline-block",
                padding: "2px 9px 2px 9px",
                color: sys.color.windowtitle,
            },
            onmouseenter: function () {
                this.style.backgroundColor = sys.color.frame;
                this.style.color = sys.color.framecontrast;
            },
            onmouseleave: function () {
                this.style.backgroundColor = "";
                this.style.color = sys.color.windowtitle;
            },
            setText: function (text) {
                this.innerText = text;
            },
            setIcon: function (src) {

            }
        }, def));
        return m;
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
        var w, dw = def.width, dh = def.height;
        delete (def.width);
        delete (def.height);
        if (dw == undefined)
            dw = 300;
        if (dh == undefined)
            dh = 200;
        // Window Title
        var wt = control("titlebar", "windowtitle", {
            visible: !def.hideTitle,
            style: {
                textAlign: "right",
                height: "20px",
                boxSizing: "border-box",
                fontFamily: "Chicago, Verdana",
                fontSize: "13px",
                lineHeight: "20px",
                position: "relative",
                paddingRight: "7px",
                userSelect: "none",
                color: sys.color.windowtitle,
            },
            content: [
                control("windowclosebutton", "closeButton", {
                    visible: !def.hideCloseButton,
                    style: {
                        top: "0",
                        left: "0",
                        width: "25px",
                        height: "20px",
                        lineHeight: "20px",
                        border: "0",
                        backgroundColor: sys.color.frame,
                        padding: 0,
                        boxSizing: "content-box",
                        color: "white",
                    },
                    setText: function (text) {
                        this.innerText = text;
                    },
                    onclick: function () {
                        w.close();
                    },
                    text: "X",
                }, document.createElement("button"))
            ],
            setTitle: function (title) {
                if (!this._textNode) {
                    this._textNode = document.createTextNode("");
                    this.appendChild(this._textNode);
                }
                this._textNode.textContent = title;
            },
            onmousedown: function (e) {
                DragNDrop.drag(this.parentControl, e.offsetX, e.offsetY);
            },
            onmouseup: function (e) {
                DragNDrop.drop(this.parentControl);
            }
        });
        // Window client
        var wc = control("windowclient", "client", {
            content: def.content,
            style: { position: "relative", margin: "5px" },
            width: dw,
            height: dh,
        });
        def.content = [wt, wc];
        // Window root
        w = control("window", id, mkDefinition({
            width: dw + 10,
            height: dh + 30,
            setTitle: function (title) {
                wt.setTitle(title);
            },
            setTop: function (val) {
                if (val < 20)
                    val = 20;
                def.top = val;
                this.style.top = val + "px";
            },
            style: {
                backgroundColor: "white",
                border: "1px solid " + sys.color.frame,
                boxShadow: "0px 0px 3px rgba(0,0,0,0.5)",
                overflow: "hidden",
            },
            close: function () {
                var close = true;
                if (this.onClose)
                    close = this.onClose();
                if (close)
                    this.hide();
            },
        }, def));
        ui.dsk.appendChild(w);
        ui.w[id] = w;
        w.client = w.content.client;
        w.titlebar = w.content.titlebar;
        w.content = w.client.content;
        return w;
    }

    /**
     * Picture control creation
     */
    function picture(id, def) {
        var c = control("picture", id, mkDefinition({
            setSrc: function (src) {
                this.src = src;
            }
        }, def), mkTag("img"));
        return c;
    }

    /**
     * Label control creation
     */
    function label(id, def) {
        var c = control("label", id, mkDefinition({
            setText: function (text) {
                this.innerText = text;
            }
        }, def));
        if (def.text !== undefined)
            c.setText(def.text);
        return c;
    }

    /**
     * TextBox control creation
     */
    function textbox(id, def) {
        var c = control("textbox", id, mkDefinition({
            setText: function (value) {
                this.value = value;
            },
            style: {
                fontSize: "10px",
                border: "1px solid " + sys.framecolor,
            }
        }, def), mkTag(def.multiple ? "textarea" : "input"));
        return c;
    }

    /**
     * Button control creation
     */
    function button(id, def) {
        var c = control("button", id, mkDefinition({
            setText: function (text) {
                this.innerText = text;
            },
            style: {
                border: "0",
                borderRadius: "7px",
                background: sys.color.frame,
                color: sys.color.framecontrast,
                height: "20px",
            },
            onmousedown: function () {
                this.style.merge({
                    background: sys.color.framecontrast,
                    color: sys.color.frame,
                })
            },
            onmouseup: function () {
                this.style.merge({
                    background: sys.color.frame,
                    color: sys.color.framecontrast,
                })
            },
            onmouseleave: function () {
                this.style.merge({
                    background: sys.color.frame,
                    color: sys.color.framecontrast,
                })
            },
        }, def), mkTag("button"));
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
        var i;
        ui.menu.sysMenu.src = app.icon ? app.icon : sys.icon;
        while (ui.menu.client.lastChild)
            ui.menu.client.removeChild(ui.menu.client.lastChild);
        for (i in app.menu)
            ui.menu.client.appendChild(app.menu[i]);
    }

    /**
     * Application creation
     */
    function app(id, def) {
        if (ui.app[id])
            throw new Error("Application '" + id + "' already exists");
        var a = {
            _type: "app",
            getId: function () {
                return id;
            },
            title: id,
            windows: {},
            menu: {},
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
        }, windows = def.windows, menu = def.menu, i;
        ui.app[id] = a;
        delete (def.windows);
        delete (def.menu);
        a.merge(def);
        if (windows)
            for (i = 0; i < windows.length; i++) {
                var win = windows[i];
                a.windows[win.getId()] = win;
                win.application = win.parent = a;
            }
        if (menu)
            for (i = 0; i < menu.length; i++) {
                var m = menu[i];
                a.menu[m.getId()] = m;
                win.application = a;
            }
        // Drop MainWindow feature 
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
            picture: picture,
            menuItem: menuItem,
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
