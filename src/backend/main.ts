import { app, BrowserWindow } from 'electron'
import { join } from 'path'

/**mở thêm cửa sổ trình duyệt với link có sẵn */
export function openNewTab(partition: string, link: string) {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            partition: `persist:${partition}`
        }
    })

    // nạp link web 
    window.loadURL(link)

    // mở cửa sổ khi đã sắn sàng
    window.once('ready-to-show', () => window.show())

    const session = window.webContents.session

    // lấy user agent của tab
    // session.getUserAgent()

    // lấy cookie của tab
    // session.cookies.get({})
    //     .then((cookies) => { })
    //     .catch((error) => { })
}

/**Tạo cửa sổ trình duyệt. */
export function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: join(__dirname, 'preload.js'),
        },
    })

    bindVue(mainWindow)

    // do something
}

/**gọi api từ nodejs để né CORS */
export function request() {
    // fetch('https://www.facebook.com/me')
    //     .then(r => r.text())
    //     .then(r => console.log('r::', r))
    //     .catch(e => console.log('e::', e))
}

/**nạp html vào cửa sổ trình duyệt */
function bindVue(mainWindow: BrowserWindow) {
    // nếu đang dev
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)

        // mở f12
        mainWindow.webContents.openDevTools()
    }
    // nếu là prod
    else mainWindow.loadFile(join(
        __dirname,
        `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`
    ))
}