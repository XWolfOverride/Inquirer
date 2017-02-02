var mergDoc = mergDoc || new function () {

    var icon = merger.media.createIcon("gray","D");

    // Locals

    var docapp;

    // Methods

    function getApp() {
        if (!docapp)
            docapp = merger.app("inquirer", {
                title: "Inquirer",
                icon: icon,
                appMenu: [
                    merger.ui.menuItem("app_close", {
                        text: "Close",
                        onClick: function () {
                            merger.leave();
                        }
                    }),
                ],
                menu: [
                    merger.ui.menuItem("app_main", {
                        text: "Inquirer",
                        items: [merger.ui.menuItem("app_close", {
                            text: "Close",
                            onClick: function () {
                                merger.leave();
                            }
                        }),
                        ],
                    }),
                    merger.ui.menuItem("app_tools", {
                        text: "Tools",
                        items: [merger.ui.menuItem("tool_console", {
                            text: "Console",
                        })
                        ]
                    }),
                    merger.ui.menuItem("test4", {
                        text: "Colors",
                        items: [merger.ui.menuItem("test4_s1", {
                            text: "Black",
                        }), merger.ui.menuItem("test4_s2", {
                            text: "Red",
                        }), merger.ui.menuItem("test4_s3", {
                            text: "Green",
                        }), merger.ui.menuItem("test4_s4", {
                            text: "Yellow",
                        }), merger.ui.menuItem("test4_s5", {
                            text: "To decide by customer",
                            items: [merger.ui.menuItem("test4_s5_1", {
                                text: "Accept",
                            }), merger.ui.menuItem("test4_s5_2", {
                                text: "Declite",
                            }), merger.ui.menuItem("test4_s5_3", {
                                text: "Wait More",
                                onClick: function () {
                                    alert("madofaka!");
                                }
                            }),
                            ],
                        }), merger.ui.menuItem("test4_s6", {
                            text: "White",
                        }),
                        ],
                    }),
                ],
                windows: [merger.ui.window("Wmain", {
                    title: "Error",
                    width: 400,
                    height: 250,
                    content: [merger.ui.picture("Iico", {
                        src: bugico,
                        top: 0,
                        left: 0,
                        width: 32,
                        height: 32,
                    }),
                    merger.ui.label("Lerror", {
                        top: 0,
                        left: 37,
                        width: 400 - 37,
                        height: 32,
                        text: "",
                    }),
                    merger.ui.label("Tinfo", {
                        top: 37,
                        left: -5,
                        width: 400,
                        height: 250 - 37 - 25 - 10,
                        multiple: true,
                        style: {
                            whiteSpace: "pre",
                            fontFamily: "Lucida Console, Monospace",
                            border: "0",
                            overflow: "scroll",
                            background: "#EEE",
                            padding: "5px",
                        },
                    }),
                    merger.ui.button("Bok", {
                        top: 250 - 20,
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
                        merger.leave();
                    },
                    setError: function (message, data) {
                        this.content.Lerror.setText(message);
                        this.content.Tinfo.setText(JSON.stringify(data, null, 2));
                    }
                })],
                mainWindow: "Wmain",
                onLoad: function () {

                },
                onAbout: function () {
                    alert("Pos claro");
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

    /** Enters environment */
    this.show = show;

} ();
