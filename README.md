## A9 x OpenRGB

本程序是一个[OpenRGB](https://openrgb.org/)的一个客户端，通过监听键盘事件来判断漂移还是非漂移，向 OpenRGB Server 发送指令，从而控制 RGB 设备的灯光，提高车辆作战性能！

选用 node.js 作为开发语言，你也可以试试其他语言。

[openrgb-sdk](https://github.com/Mola19/openrgb-sdk)是一个 node.js 与 OpenRGB 通信的库。

[iohook](https://github.com/wilix-team/iohook)用来在 node.js 环境下监听键盘鼠标事件，推荐在 Node13 下运行。
