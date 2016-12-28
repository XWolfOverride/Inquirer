var merger = new function () {
    var sysicon = "data:image/gif;base64,R0lGODlhIAAgAOMAAP///zOZ/47N8FxqpgAAAMzM/7+/v9nu+QBjpAA9hP///////////////////////yH5BAEKAA8ALAAAAAAgACAAAATq8MlJH7k16y3JEQXGjZVXBGBIkKQpoEIqsuVRxHAsr3Rn6zndjuYCCo8F1ahoPCJDG2bTKbTxKNIpVWAbXH03atDZ9ZYKh49zXC0M3l/LKZA+Bthc99uMnd/rLzhBZXtxBH53dGpAKISFZ4mJCIpHjo99kQGTiWmdbgkJe3AGmJKZdwUPem+ghQavHX6bpyABoqyhBK+wh3ezpwGrtwMJurtymsCRwsPGpHK/ysyizhME0dLDo7DWBMqZ017HFQYX36jN4xrl3tnU6hzswMLVPfLLrtw9EvfB28/7KMhzUy9gBnYFDa6DtyECADs=";
    var sysver = "0.1c";
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

    function clockTick() {
        var now = new Date();
        var h = now.getHours();
        var m = now.getMinutes();
        if (h < 10) h = "0" + h;
        if (m < 10) m = "0" + m;
        ui.menu.time.innerText = h + ":" + m;
    }

    // ---- Tools

    function insist(ctrl) {
        var controller = {
            when: function () {
                return true;
            },
            each: undefined,
            do: function () {
            }
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

    function mkTag(tag) {
        return document.createElement(tag);
    }

    function mkCSS(css) {
        style = mkTag('style');
        if (style.styleSheet)
            style.styleSheet.cssText = css;
        else
            style.appendChild(document.createTextNode(css));
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    function openDesktop() {
        if (!ui.dsk.merger_init) {
            ui.dsk.merger_init = true;
            ui.bg = mkTag("div");
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
            ui.menu = mkTag("div");
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
            ui.menu.sysMenu.src = sysicon;
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
            ui.dsk.appendChild(ui.menu);
            clockTick();
            setInterval(clockTick, 60000);
        }
        ui.dsk.style="";
    }

    function control(id, def, c) {
        if (!c) {
            c = mkTag("div");
            c.style.display = "none";
        }
        c.setAttribute("id", id);
        c.setAttribute("name", id);
        c.style.position = "absolute";
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
        // What hapens with value W/O setters?
        for (var key in settings) {
            var o = settings[key];
            o.f(o.d);
        }
        return c;
    }

    function menuItem(id, def) {
        var m = mkTag("div").merge({

        });
    }

    function window(id, def) {
        if (typeof (def) != "object")
            def = {};
        if (def.height == undefined)
            def.height = 300;
        if (def.width == undefined)
            def.width = 450;
        if (def.top == undefined)
            def.top = (ui.dsk.clientHeight - def.height) / 2;
        if (def.left == undefined)
            def.left = (ui.dsk.clientWidth - def.width) / 2;
        if (!def.content)
            def.content = [];
        var w;
        // Window Title
        var wt = control("title", {
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
            },
            close: function () {
                var close = true;
                if (this.onClose)
                    close = this.onClose();
                if (close)
                    this.setVisible(false);
            }
        }.merge(def));
        ui.dsk.appendChild(w);
        ui.w[id] = w;
        return w;
    }

    function icon(id, def) {

    }

    function label(id, def) {
        var c = control(id, def);
        c.setText = function (text) {
            this.innerText = text;
        }
        c.setText(def.text);
        return c;
    }

    function button(id, def) {

    }

    function list(id, def) {
        var c = control(id, def);
        c.style.border = "1px solid red";
        return c;
    }

    function get(id) {
        return ui.w[id];
    }

    // ---- Kernel implementation    
    // --------------------------

    function kSwitchApp(app) {
        ui.menu.sysMenu.src = app.icon ? app.icon : sysicon;
    }

    function app(id, def) {
        if (ui.app[id])
            throw new Error("Application '" + id + "' already exists");
        var a = {}
        ui.app[id] = a;
        a.merge({
            getId: function () {
                return id;
            },
            title: id,
            mainWindow: undefined,
            window: {},
            control: {},
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
        a.merge(def);
        if (a.mainWindow)
            a.window[a.mainWindow.getId()] = a.mainWindow;
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

    // -- Kernel
    this.merge({
        app: app,
        enter: enter,
        leave: leave,
        version: sysver,
        // -- UI
        ui: {
            window: window,
            get: get,
            list: list,
            label: label,
            button: button,
        }
    });

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
            display: "none",
        });
        insist({
            when: function () {
                return document.body;
            },
            do: function () {
                document.body.appendChild(ui.dsk);
            },
            each: 100,
        })
    }

    kInit();
}

merger.app("merger", {

});
