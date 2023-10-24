import { app, BrowserWindow } from 'electron'
import { createWindow } from './backend/main'

// Xử lý việc tạo/xóa phím tắt trên Windows khi cài đặt/gỡ cài đặt.
if (require('electron-squirrel-startup')) app.quit()

// Method này sẽ được gọi khi Electron kết thúc
// khởi tạo và sẵn sàng tạo cửa sổ trình duyệt.
// Một số API chỉ có thể được sử dụng sau khi sự kiện này xảy ra.
app.on('ready', () => createWindow())

// Thoát khi đóng tất cả các cửa sổ, ngoại trừ trên macOS. Ở đó, nó phổ biến
// để các ứng dụng và thanh menu của chúng tiếp tục hoạt động cho đến khi người 
// dùng thoát rõ ràng bằng Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform == 'darwin') return

  app.quit()
})

// Trên OS X, việc tạo lại một cửa sổ trong ứng dụng là thông thường khi
// biểu tượng dock được nhấp vào và không có cửa sổ nào khác mở.
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})