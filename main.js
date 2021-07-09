const electron = require("electron");
const url = require("url");
const path = require("path");
const { Menu } = require("electron/main");
const { ipcMain } = require("electron");

const {app, BrowserWindow, ıpcMain, nativeTheme} = electron;

let mainWindow, otherWindow;

app.on("ready", () => {
    console.log(process.platform);

mainWindow = new BrowserWindow({
    width: 800,
    height: 400,
    title: "DÖKÜMAN.mc",
    frame: true,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
    }
});

mainWindow.loadURL(
    url.format({
        pathname: path.join(__dirname, "main.html"),
        protocol: "file:",
        slashes: true
    })
);

const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
Menu.setApplicationMenu(mainMenu);

ipcMain.on("anahtar-1", (hata, veri) => {
    console.log(veri)
});

ipcMain.on("anahtar-2", (hata, veri) => {
    console.log(veri);
})

ipcMain.on("anahtar-3", () => {
    otherWindow = new BrowserWindow({
        width: 400,
        height: 300,
        title: "YENİ.mc",
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    otherWindow.setResizable(false);

    otherWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "ayrıntılar/YENİ PENCERE/other.html"),
            protocol: "file:",
            slashes: true
        })
    );

        otherWindow.on("close", () => {
        otherWindow = null;
        })

   mainWindow.on("close", () => {
        app.quit();
   })
});

ipcMain.on("anahtar-exit", () => {
    otherWindow.close();
    otherWindow = null;
});

});





const mainMenuTemplate = [
    {
        label: "ELECTRON"
    },
    {
        label: "GİRİŞ",
        submenu: [
            {
                label: "YARDIM",
                role: "help",
                click: function () {
                    electron.shell.openExternal("https://www.electronjs.org/docs");
                }
            },
            { type: 'separator' },
            {
                label: "grş 2",
                submenu: [
                    {
                        label: "geliştirici araçlarını aç",
                        click: function (item, focuseWindow) {
                            focuseWindow.toggleDevTools();
                        }
                    }
                ]
            },
            {
                label: "KISACA",
                submenu : [
                    { role: 'undo' },
                    { role: 'redo' },
                    { type: 'separator' },
                    { role: 'cut' },
                    { role: 'copy' },
                    { role: 'paste' },
                ]
            }
        ]
    },
    {
        label: "AYRINTILAR",
        submenu : [
            {
                label: "Yenile",
                role: "reload"
            },
            {
                    label: "Modlar",
                    submenu: [
                        {
                            label: "Karanlık",
                            visible: true,
                            click: function () {
                        
                            nativeTheme.themeSource = 'dark'
                    }
                        },
                        {
                            label: "aydınlık",
                            visible: true,
                            click: function () {
                        
                            nativeTheme.themeSource = 'light'
                    }
                        },
                        {
                            label: "Sistem",
                            visible: true,
                            click: function () {
                        
                            nativeTheme.themeSource = 'system'
                    }
                        }
                    ]
            }
        ]
    },
    {
        label: "ÇIKIŞ",
        submenu : [
            {
                label: "ÇIK",
//              accelarator: process.platform == "darwin" ? "Commond+Q" : "Alt+F4", KISAYOL OLUŞTURMA
                role: "quit"
            },
            {
                label: "ÇK 2",
                click: function() {
                    console.log("KULLANICI ÇIKTI | USER QUIT");
                }
            }
        ]
    }
];







// MAC işletim sistemine sahip olanlar için menü

if(process.platform == "darwin"){
    mainMenuTemplate.unshift({
        label: app.getName(),
        role: "TODO"
    });
}


