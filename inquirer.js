var inquirer = inquirer || new function () {

	var icon = "R0lGODlhIAAgAKECADIyMjMzM////////yH5BAEKAAIALAAAAAAgACAAAAJulI8Zke2PFoC0LlZzW7qf633XGGHeiJqcaKWgsQov5JLvTNeYq+kM36vBUJNgaujDiVDIpLK58ylIiiU0NjWVZscHgAuUUXPOpfbhjD1bwmFIrHsvv+3Qrd4Byzda7N7h9zclmEOIFmgolgj4VgAAOw==";

	// Toolkit
	var muTK = new function () {
		var ui = {
			w: {}
		};

		function desktop() {
			if (!ui.dsk) {
				ui.dsk = document.createElement("div");
				ui.dsk.style.position = "absolute";
				ui.dsk.style.zIndex = 510;
				ui.dsk.style.top = 0;
				ui.dsk.style.left = 0;
				ui.dsk.style.width = "100%";
				ui.dsk.style.height = "100%";
				ui.bg = document.createElement("div");
				ui.bg.style.backgroundColor = "gray";
				ui.bg.style.opacity = 0.3;
				ui.bg.style.position = "absolute";
				ui.bg.style.top = 0;
				ui.bg.style.left = 0;
				ui.bg.style.width = "100%";
				ui.bg.style.height = "100%";
				ui.dsk.appendChild(ui.bg);
				ui.menu = document.createElement("div");
				ui.menu.style.position = "absolute";
				ui.menu.style.zIndex = 512;
				ui.menu.style.top = 0;
				ui.menu.style.left = 0;
				ui.menu.style.width = "100%";
				ui.menu.style.height = "16px";
				ui.menu.style.padding = "1px 5px 1px 5px";
				ui.menu.style.backgroundColor = "white";
				ui.menu.style.borderBottom = "1px solid black";
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

		function control(id, def) {
			var c = document.createElement("div");
			c._id = id;
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
			if (def.top)
				c.setTop(def.top);
			if (def.left)
				c.setLeft(def.left);
			if (def.width)
				c.setWidth(def.width);
			if (def.height)
				c.setHeight(def.height);
			if (def.content)
				for (var i = 0; i < def.content.length; i++)
					c.appendChild(def.content[i]);
			return c;
		}

		function window(id, def) {
			if (def.top == undefined)
				def.top = (ui.dsk.clientHeight - def.height) / 2;
			if (def.left == undefined)
				def.left = (ui.dsk.clientWidth - def.width) / 2;
			var wt = document.createElement("div");
			wt.style.borderBottom = "1px solid black";
			wt.style.textAlign = "center";
			wt.style.lineHeight = "20px";
			wt.innerText = def.title;
			if (!def.content)
				def.content = [];
			def.content.splice(0, 0, wt);
			var w = control(id, def);
			w.style.backgroundColor = def.bg == undefined ? "white" : def.bg;
			w.style.border = "1px solid black";
			w.style.boxShadow = "0 0 5px gray";
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
		muTK.desktop();
		var w = muTK.get("Werror");
		if (!w) {
			w = muTK.window("Werror", {
				title: "Error",
				width: 400,
				height: 200,
				content: [muTK.label("Lerror", {
					top: 30,
					left: 10,
					text: "---"
				}), muTK.list("Lerrors", {
					top: 80,
					left: 10,
					width: 320,
					height: 100,
				}), muTK.button("Bok", {
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
		muTK.close();
	}

	function error(message, data) {
		if (this.autoShow)
			show();
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

	function hook() {
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
		document.addEventListener("keydown", ckc, false);
	}

	// Publish
	/** Open Inquirer environment when a new unhandled error happen */
	this.autoShow = true;

	/** Hook the webpage to control errors (Automatically hooked) */
	this.hook = hook;

	/** Collect an error and if autoShow is true enters environment */
	this.error = error;

	/** Enters environment */
	this.show = show;

	/** Exit environent */
	this.hide = hide;

	/** Enters environment and open variable inspector */
	this.inspect = inspect; !!

	/** Enters environment and open inquirer console */
	this.console = console; !!

	/** Log an object into the console */
	this.log = log; !!

	// Hook to system

	hook();

} ();
