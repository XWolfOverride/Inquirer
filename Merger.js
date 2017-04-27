/*
 * Merger UI V0.3
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

var merger = new function () {

    //=== Merger System Configuration
    //=============================================================================================
    var core, // Core object (initialized below)
        sys = { // Configuration
            _type: "system",
            icon: "data:image/gif;base64,R0lGODlhIAAgAOMAAP///zOZ/47N8FxqpgAAAMzM/7+/v9nu+QBjpAA9hP///////////////////////yH5BAEKAA8ALAAAAAAgACAAAATq8MlJH7k16y3JEQXGjZVXBGBIkKQpoEIqsuVRxHAsr3Rn6zndjuYCCo8F1ahoPCJDG2bTKbTxKNIpVWAbXH03atDZ9ZYKh49zXC0M3l/LKZA+Bthc99uMnd/rLzhBZXtxBH53dGpAKISFZ4mJCIpHjo99kQGTiWmdbgkJe3AGmJKZdwUPem+ghQavHX6bpyABoqyhBK+wh3ezpwGrtwMJurtymsCRwsPGpHK/ysyizhME0dLDo7DWBMqZ017HFQYX36jN4xrl3tnU6hzswMLVPfLLrtw9EvfB28/7KMhzUy9gBnYFDa6DtyECADs=",
            ver: "0.3b",
            color: {
                frame: "teal", //"orange"
                client: "white",
                framecontrast: "white",
                text: "black",
                windowtitle: "black",
                selection: "lightskyblue",
            },
            icons: {},
        };

    //=== Merger Core Framework
    //=============================================================================================

	/**
	 * Merge method the root of all merger framework
	 */
    if (!Object.prototype.merge)
        Object.defineProperty(Object.prototype, "merge", {
            writable: true,
            value: function (src) {
                if (!src)
                    return this;
                for (var key in src)
                    this[key] = src[key];
                return this;
            }
        });

	/**
	 * Merger Core
	 */
    function MergerCore() {
        var apps = {}, initialized = false, selectedApp, dsk, menu, menuToShow, menuCurrent, core = this;

        /** Return desktop element */
        function getDesktop() {
            if (!dsk) {
                dsk = core.mkTag("div");
                dsk.setAttribute("id", "Merger::Desktop");
                dsk.style.merge({
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
                dsk.addEventListener("mousemove", function (e) {
                    if (DragNDrop.dragging())
                        DragNDrop.update(e.clientX, e.clientY);
                });
                dsk.addEventListener("click", function (e) {
                    if (menuCurrent) {
                        menuCurrent.close(true);
                        menuCurrent = undefined;
                    }
                    if (menuToShow) {
                        menuToShow.popup();
                        menuToShow = undefined;
                    }
                });
            }
            return dsk;
        }

        /** Return menu element */
        function getMenu() {
            if (!menu) {
                menu = core.mkTag("div");
                menu.setAttribute("id", "Merger::Menu");
                menu._zLayer = 10;
                getDesktop().appendChild(menu);
                menu.style.merge({
                    position: "absolute",
                    zIndex: 512,
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "21px",
                    padding: "0px 5px 0px 0px",
                    backgroundColor: "white",
                    borderBottom: "1px solid " + sys.color.frame,
                    boxSizing: "border-box",
                });
                menu.sysMenu = merger.ui.menuItem("sysMenu", {
                    icon: sys.icon,
                    style: {
                        float: "left",
                        padding: "2px 7px 2px 12px",
                        fontFamily: "Arial",
                        fontSize: "14px",
                        lineHeight: "16px",
                        backgroundColor: sys.color.frame,
                        color: "white",
                    },
                    onmouseenter: function () {
                        this.style.backgroundColor = "";
                        this.style.color = sys.color.windowtitle;
                    },
                    onmouseleave: function () {
                        this.style.backgroundColor = sys.color.frame;
                        this.style.color = sys.color.framecontrast;
                    },
                    parentControl: sys,
                });
                menu.client = core.mkTag("div");
                menu.client.style.merge({
                    padding: "0 0 0 1px",
                    float: "left",
                    fontFamily: "Arial",
                    fontSize: "14px",
                    lineHeight: "16px",
                });
                menu.time = core.mkTag("div");
                menu.time.style.merge({
                    float: "right",
                    fontFamily: "Arial",
                    fontSize: "14px",
                    lineHeight: "16px",
                    padding: "2px 4px 2px 4px",
                });
                menu.appendChild(menu.sysMenu);
                menu.appendChild(menu.client);
                menu.appendChild(menu.time);
                menu.style.merge({
                    userSelect: "none",
                })

                /** Update clock */
                function clockTick() {
                    var now = new Date(), h = now.getHours(), m = now.getMinutes();
                    if (h < 10)
                        h = "0" + h;
                    if (m < 10)
                        m = "0" + m;
                    menu.time.innerText = h + ":" + m;
                }

                clockTick();
                setInterval(clockTick, 60000);
            }
            return menu;
        }

        /** Open desktop */
        function enterDesktop() {
            if (!selectedApp) {
                switchApplication();
            }
            document.body.appendChild(getDesktop());
        }

        /** Close desktop */
        function leaveDesktop() {
            var desktop = getDesktop();
            if (document.body.contains(desktop))
                document.body.removeChild(desktop);
        }

        /** Create application */
        function createApplication(id, def) {
            if (apps[id])
                throw new Error("Application '" + id + "' already exists");
            var a = new MergerApplication(id), windows = def.windows, menu = def.menu, i;
            apps[id] = a;
            delete (def.windows);
            delete (def.menu);
            a.merge(def);
            if (windows)
                for (i = 0; i < windows.length; i++)
                    a.addWindow(windows[i]);
            if (menu)
                for (i = 0; i < menu.length; i++) {
                    var m = menu[i];
                    a.menu[m.getId()] = m;
                    m.application = m.parentControl = a;
                    m.style.display = "inline-block";
                    m._root = true;
                }
            if (a.onLoad)
                a.onLoad();
            return a;

        }

        /** Switch to application */
        function switchApplication(a) {
            var i, m, ax, menu = getMenu();
            if (!a)
                if (selectedApp && a == selectedApp)
                    a = selectedApp;
                else
                    if (Object.keys(apps).length > 0)
                        a = apps[Object.keys(apps)[0]];
                    else return false;
            if (typeof a === "string") {
                a = apps[a]
                if (!a)
                    return false;
            }
            if (selectedApp)
                for (i in selectedApp.windows)
                    core.getDesktop().removeChild(selectedApp.windows[i]);
            selectedApp = a;
            menu.sysMenu.setIcon(a.icon ? a.icon : sys.icon);
            menu.sysMenu.setText(a.title ? a.title : a.id);
            menu.sysMenu.items = [];
            menu.sysMenu.items.push(
                m = merger.ui.menuItem("sys_about", {
                    icon: core.getHelpIcon(),
                    text: "About " + a.title,
                    enabled: a.onAbout,
                    onClick: function () {
                        if (a.onAbout)
                            a.onAbout();
                    }
                })
            );
            m.parentControl = menu.sysMenu;
            if (Object.keys(apps).length > 1) {
                menu.sysMenu.items.push(m = menuSeparator("sys_applications_separator1"));
                m.parentControl = menu.sysMenu;
                for (i in apps) {
                    ax = apps[i];
                    menu.sysMenu.items.push(
                        m = merger.ui.menuItem("sys_app_" + i, {
                            icon: ax.icon ? ax.icon : sys.icon,
                            text: ax.title,
                            _app: ax,
                            onClick: function () {
                                switchApplication(this._app);
                            }
                        })
                    );
                    m.parentControl = menu.sysMenu;
                }
            }
            // Application appMenu
            if (a.appMenu && a.appMenu.length > 0) {
                menu.sysMenu.items.push(m = menuSeparator("sys_applications_separator2"));
                m.parentControl = menu.sysMenu;
                for (i in a.appMenu) {
                    menu.sysMenu.items.push(m = a.appMenu[i]);
                    m.parentControl = menu.sysMenu;
                }
            }
            // Application menu
            while (menu.client.lastChild)
                menu.client.removeChild(menu.client.lastChild);
            for (i in a.menu)
                menu.client.appendChild(a.menu[i]);
            for (i in a.windows) {
                core.getDesktop().appendChild(a.windows[i]);
                a.windows[i].setVisible(a.windows[i].getVisible());
            }
        }

        /** get focused application */
        function getSelectedAppId() {
            return selectedApp ? selectedApp.getId() : undefined;
        }

        /** Focus application */
        function focusApplication(app) {
            enterDesktop();
            return switchApplication(app);
        }

        /** Show menu */
        function showMenu(menu) {
            menuToShow = menu;
        }

        /** Set menu as current one */
        function setCurrentMenu(menu) {
            menuCurrent = menu;
        }

        /** Check if menu is marked as current */
        function menu_isCurrent(menu) {
            return menuCurrent == menu;
        }

        this.merge({
            enterDesktop: enterDesktop,
            getDesktop: getDesktop,
            leaveDesktop: leaveDesktop,
            app: {
                create: createApplication,
                switch: switchApplication,
                focus: focusApplication,
                getFocused: getSelectedAppId,
            },
            menu: {
                showMenu: showMenu,
                setCurrent: setCurrentMenu,
                isCurrent: menu_isCurrent,
            }
        })
    }

	/**
	 * Tool for creating tags
	 */
    MergerCore.prototype.mkTag = function (tag) {
        return document.createElement(tag);
    }

    /**
     * Tool to merge control definition preserving style
     */
    MergerCore.prototype.mkDefinition = function (a, b) {
        if (a.style)
            b.style = a.style.merge(b.style);
        return a.merge(b);
    }

    /**
     * Create a standard SVG icon
     */
    MergerCore.prototype.mkIcon = function (color, text) {
        return "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128' version='1.1'><circle cx='64' cy='64' r='62' id='c' style='fill:" + color + ";fill-opacity:1' /><text text-anchor='middle' alignment-baseline='alphabetic' style='font-weight:bold;font-size:90px;font-family:sans-serif;fill:#ffffff;stroke:none;' x='64' y='95'>" + text + "</text></svg>";
    }

    /**
     * Return current configured help icon
     */
    MergerCore.prototype.getHelpIcon = function () {
        return sys.icons.help ? sys.icons.help : this.mkIcon(sys.color.frame, '?');
    }

    /**
     * Return current configured close icon
     */
    MergerCore.prototype.getCloseIcon = function () {
        return sys.icons.help ? sys.icons.help : this.mkIcon(sys.color.frame, 'X');
    }

    core = new MergerCore();

    //=== Merger Application Framework
    //=============================================================================================

    /** Merger application base definition */
    function MergerApplication(id, def) {
        this.merge({
            _type: "app",
            icon: sys.icon,
            getId: function () {
                return id;
            },
            title: id,
            windows: {},
            menu: {},
        });
    }

    /** Show application */
    MergerApplication.prototype.show = function () {
        core.enterDesktop();
        core.app.focus(this.getId());
        if (this.onEnter)
            this.onEnter();
    }

    /** Add window to application */
    MergerApplication.prototype.addWindow = function (win) {
        this.windows[win.getId()] = win;
        win.application = win.parentControl = this;
        win.setAttribute("id", this.getId() + "::" + win.getId());
        if (core.app.getFocused(this.getId()))
            core.getDesktop().appendChild(win);
    }

    /** Remove window from application */
    MergerApplication.prototype.removeWindow = function (win) {
        if (!this.windows[win.getId()])
            return;
        win.hide();
        delete this.windows[win.getId()];
        core.getDesktop().removeChild(win);
    }

    //=== Tools
    //=============================================================================================

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
            execute: function () {
            },
            each: 20
        }.merge(ctrl);
        controller.check = function () {
            if (!this.when())
                setTimeout(this.check.bind(this), this.each);
            else
                this.execute();
        }
        controller.check();
    }

    /**
     * Generates a random id
     */
    function randId(prefix) {
        var id = Number(Math.round(Math.random() * 0xFFFFF)).toString(16);
        while (id.length < 5)
            id = '0' + id;
        return prefix + "_" + id;
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
                else if (item == ctl)
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

    //=== Control Tool Kit (MTK)
    //=============================================================================================

	/**
	 * Base control creation
	 */
    function control(type, id, def, c) {
        if (!c)
            c = core.mkTag("div");
        c.setAttribute("merger_type", type);
        c.setAttribute("id", id);
        c.setAttribute("name", id);
        c._type = type;
        c.content = {};
        c.getId = function () {
            return id;
        }
        c.setTop = function (val) {
            this.top = val;
            this.style.top = val + "px";
        }
        c.setLeft = function (val) {
            this.left = val;
            this.style.left = val + "px";
        }
        c.setWidth = function (val) {
            this.width = val;
            this.style.width = val + "px";
        }
        c.setHeight = function (val) {
            this.height = val;
            this.style.height = val + "px";
        }
        c.setVisible = function (val) {
            this.style.display = val ? "" : "none";
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
        c.getApplication = c.getApp = function () {
            if (this.application)
                return this.application;
            var w = this.getWindow(), a = this;
            if (w)
                return w.application;
            while (a && a._type != "app")
                a = win.parentControl;
            return a;
        }
        c.merge = function (def) {
            var settings = {}, obj, key, mdata;
            for (key in def) {
                mdata = def[key];
                if (typeof mdata == "function") {
                    if (this[key])
                        def[key].super = this[key].bind(this);
                    this[key] = def[key];
                } else {
                    var fname = "set" + key[0].toUpperCase() + key.substring(1);
                    var fnc = this[fname];
                    settings[key] = {
                        f: (fnc && typeof fnc == "function") ? fnc.bind(this) : null, d: mdata
                    };
                }
            }
            for (key in settings) {
                var o = settings[key];
                if (o.f)
                    o.f(o.d);
                else
                    this[key] = o.d;
            }
        }
        c.merge(core.mkDefinition({
            style: {
                position: "absolute",
            },
            anchor: { top: true, right: false, bottom: false, left: true },
            bringToFront: function () {
                var p, els, i, l;
                p = this.parentNode;
                if (!p)
                    return;
                els = [].slice.apply(p.children, [0]);
                els.sort(function (a, b) {
                    if (a == this)
                        return 1;
                    if (b == this)
                        return -1;
                    return Number(a.style.zIndex) - Number(b.style.zIndex);
                }.bind(this))
                for (i in els) {
                    l = els[i]._zLayer || 0;
                    els[i].style.zIndex = Number(i) + 1 + (l * 100000);
                }
            }

        }, def));
        if (c.onControlCreate)
            c.onControlCreate();
        return c;
    }

	/**
	 * Menu Item control creation
	 */
    function menuItem(id, def) {
        var client, dirty = true, icon, openMark, textElement, m = control("menu", id, core.mkDefinition({
            style: {
                position: "",
                padding: "2px 9px 2px 9px",
                color: sys.color.windowtitle,
            },
            setText: function (text) {
                if (!textElement)
                    this.appendChild(textElement = document.createTextNode(text));
                else textElement.textContent = text;
            },
            setIcon: function (src) {
                if (src) {
                    if (!icon) {
                        this.appendChild(icon = core.mkTag("img"));
                        icon.style.merge({
                            width: "16px",
                            height: "16px",
                            float: "left",
                            padding: "0 5px 0 0",
                            filter: "drop-shadow(rgb(255, 255, 255) 0px 0px 1px)",
                        });
                    } else
                        icon.style.display = "";
                    icon.src = src;
                } else if (icon) icon.style.display = "none";
            },
            showMoreMark: function () {
                if (!openMark) {
                    this.appendChild(openMark = core.mkTag("div"));
                    openMark.style.merge({
                        float: "right",
                        padding: "0 0 0 5px",
                    });
                    openMark.appendChild(document.createTextNode("\u25B6"));
                } else openMark.style.display = "";
            },
            hideMoreMark: function () {
                if (openMark)
                    openMark.style.display = "none";
            },
            popup: function () {
                if (this.parentControl._type == "menu")
                    this.parentControl.popup();
                if (client && client._visible)
                    return;
                if (!client) {
                    client = control("menuClient", id + "_client", {
                        style: {
                            background: sys.color.client,
                            border: "1px solid " + sys.color.frame,
                            fontFamily: "Arial",
                            fontSize: "14px",
                        },
                        _zLayer: 2,
                    });
                    core.getDesktop().appendChild(client);
                }
                var bounds = this.getBoundingClientRect();
                if (this.parentControl._type == "menu")
                    client.merge({
                        top: bounds.top,
                        left: bounds.left + bounds.width,
                    });
                else
                    client.merge({
                        top: bounds.top + bounds.height,
                        left: bounds.left,
                    });
                while (client.lastChild)
                    client.removeChild(client.lastChild);
                for (i in this.items) {
                    var m = this.items[i];
                    m.application = this.application;
                    m.parentControl = this;
                    if (m.items)
                        m.showMoreMark();
                    client.appendChild(m);
                }
                core.menu.setCurrent(this);
                client.show();
            },
            close: function (all) {
                if (client)
                    client.hide();
                if (core.menu.isCurrent(this))
                    core.menu.setCurrent(null);
                if (all && this.parentControl._type == "menu")
                    this.parentControl.close(all);
            },
            onmouseenter: function () {
                this.style.backgroundColor = sys.color.frame;
                this.style.color = sys.color.framecontrast;
            },
            onmouseleave: function () {
                this.style.backgroundColor = "";
                this.style.color = sys.color.windowtitle;
            },
            onclick: function () {
                if (this.items)
                    core.menu.showMenu(this);
                else if (this.onClick)
                    this.onClick.apply(this, arguments);
            }
        }, def));
        return m;
    }

	/**
	 * Menu separator control creation
	 */
    function menuSeparator(id, def) {
        var line, m = menuItem(id, {
            setText: undefined,
            setIcon: undefined,
            showMoreMark: undefined,
            onmouseenter: undefined,
            onmouseleave: undefined,
            onclick: function () {
                core.menu.showMenu(this);
            },
            onControlCreate: function () {
                this.appendChild(line = document.createElement("div"));
                line.style.merge({
                    width: "100%",
                    height: "1px",
                    background: sys.color.frame,
                });
            },
        })
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
            def.top = document.body ? (document.body.clientHeight - def.height) / 2 : undefined;
        if (def.left == undefined)
            def.left = document.body ? (document.body.clientWidth - def.width) / 2 : undefined;
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
                if (e.offsetY < 1)
                    return;
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
        w = control("window", id, core.mkDefinition({
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
            setVisible: function (vis) {
                arguments.callee.super(vis);
                if (vis) {
                    this.bringToFront();
                    if (this.top === undefined)
                        this.setTop((document.body.clientHeight - this.height) / 2);
                    if (this.left === undefined)
                        this.setLeft((document.body.clientWidth - this.width) / 2);
                }
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
                if (close === undefined || close)
                    this.hide();
            },
            onmousedown: function () {
                this.bringToFront();
            },
        }, def));
        def.width = dw;
        def.height = dh;
        w.client = w.content.client;
        w.titlebar = w.content.titlebar;
        w.content = w.client.content;
        return w;
    }

	/**
	 * Picture control creation
	 */
    function picture(id, def) {
        var c = control("picture", id, core.mkDefinition({
            setSrc: function (src) {
                this.src = src;
            }
        }, def), core.mkTag("img"));
        return c;
    }

	/**
	 * Label control creation
	 */
    function label(id, def) {
        var c = control("label", id, core.mkDefinition({
            setText: function (text) {
                this.innerText = text;
            }
        }, def));
        if (def.text !== undefined)
            c.setText(def.text);
        return c;
    }

	/**
	 * HTML control creation
	 */
    function html(id, def) {
        var c = control("html", id, core.mkDefinition({
            setHtml: function (text) {
                this.innerHTML = text;
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
        var c = control("textbox", id, core.mkDefinition({
            setText: function (value) {
                this.value = value;
            },
            getText: function () {
                return this.value;
            },
            style: {
                fontSize: "10px",
                border: "1px solid " + sys.color.frame,
            }
        }, def), core.mkTag(def.multiple ? "textarea" : "input"));
        return c;
    }

	/**
	 * CheckBox control creation
	 */
    function checkbox(id, def) {
        var c = control("checkbox", id, core.mkDefinition({
            style: {
                margin: "0",
            },
            setChecked: function (value) {
                this.checked = value;
            },
            getChecked: function () {
                return this.checked;
            },
        }, def), core.mkTag("input"));
        c.type = "checkbox";
        return c;
    }

	/**
	 * Button control creation
	 */
    function button(id, def) {
        var c = control("button", id, core.mkDefinition({
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
        }, def), core.mkTag("button"));
        c.setText(def.text);
        c.addEventListener("click", function () {
            if (this.onClick)
                this.onClick.apply(this, arguments)
        }, false);
        return c;
    }

	/**
	 * DropDown control creation
	 */
    function dropdown(id, def, listMode) {
        if (listMode)
            def.size = 2;
        var c = control(listMode ? "list" : "dropdown", id, core.mkDefinition({
            setItems: function (items) {
                this.clear();
                this.addAll(items);
            },
            clear: function () {
                while (this.options.length > 0)
                    this.remove(this.options.length - 1);
            },
            add: function (item) {
                if (!(item instanceof Option)) {
                    if (typeof item == "object")
                        item = new Option(item.value, item.key);
                    else
                        item = new Option(item, item);
                }
                this.add.super(item);
            },
            addAll: function (items) {
                var i;
                for (i in items)
                    this.add(items[i]);
            }
        }, def), core.mkTag("select"));
        return c;
    }

	/**
	 * List control creation
	 */
    function list(id, def) {
        return dropdown(id, def, true)
    }

	/**
	 * Dialog creation tool 
	 */
    function dialog(app, id, def, buttons) {
        if (!def)
            def = {};
        def.merge({
            width: def.width || 300,
            height: def.height || 300,
            onClose: function () {
                app.removeWindow(w);
            }
        });
        var w, i, bt, x = def.width;
        if (buttons) {
            def.content = def.content || [];
            for (i = 0; i < buttons.length; i++)
                def.content.push(buttons[i]);
        }
        w = window(id || randId("dialog"), def);
        app.addWindow(w);
        for (i = buttons.length - 1; i >= 0; i--) {
            bt = buttons[i];
            x -= bt.offsetWidth;
            bt.merge({
                top: def.height - bt.offsetHeight,
                left: x,
                _user_onClick: bt.onClick,
                onClick: function () {
                    app.removeWindow(w);
                    if (this._user_onClick)
                        this._user_onClick();
                }
            });
        }
        return w;
    }

	/**
	 * MessageBox creation tool
	 */
    function dialog_messageBox(app, text, title, buttons, icon, height) {
        var def = {
            modal: true,
            title: title,
            width: icon ? 360 : 300,
            height: height || 75,
            content: [
            ]
        }, d;
        if (icon)
            def.content.push(
                picture("pIcon", {
                    top: 0,
                    left: 0,
                    width: 48,
                    height: 48,
                    src: icon,
                })
            );
        def.content.push(
            html("htText", {
                top: 24,
                left: icon ? 60 : 0,
                width: 300,
                html: text,
            })
        );
        if (!buttons || buttons.length == 0) {
            buttons = [button("btOk", { text: "Ok" })];
        }
        d = dialog(app, null, def, buttons);
        d.show();
        d.focus();
        return d;
    }

	/**
	 * Merger API
	 */
    // -- Kernel
    this.merge({
        app: core.app.create,
        enter: core.enterDesktop,
        leave: core.leaveDesktop,
        version: sys.ver,
        // -- UI
        ui: {
            window: window,
            dialog: dialog,
            dropdown: dropdown,
            list: list,
            label: label,
            html: html,
            textbox: textbox,
            checkbox: checkbox,
            button: button,
            picture: picture,
            menuItem: menuItem,
            menuSeparator: menuSeparator,
        },
        dialogs: {
            messageBox: dialog_messageBox,
        },
        media: {
            createIcon: core.mkIcon,
            helpIcon: core.getHelpIcon.bind(core),
            closeIcon: core.getCloseIcon.bind(core),
        },
        conf: {
            color: sys.color,
            icon: sys.icons,
        }
    });
}
