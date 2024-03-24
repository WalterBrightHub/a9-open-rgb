'use strict'

const ioHook = require('iohook')
const { Client } = require('openrgb-sdk')

async function start() {
  const client = new Client('A9', 6742, 'localhost')

  await client.connect()

  console.log('连接成功')
  const amount = await client.getControllerCount()
  let deviceList = []
  for (let deviceId = 0; deviceId < amount; deviceId++) {
    deviceList.push(await client.getControllerData(deviceId))
  }
  const colorsRed = Array(deviceList[0].colors.length).fill({
    red: 0xff,
    green: 0x00,
    blue: 0x54,
  })
  const colorsGreen = Array(deviceList[0].colors.length).fill({
    red: 0x00,
    green: 0xff,
    blue: 0x00,
  })
  let drift = false
  const update = async (colors) => {
    // await
    client.updateLeds(0, colors)
  }

  let interval = setInterval(() => update(colorsGreen), 1500)

  ioHook.on('keyup', async (event) => {
    if (event.rawcode === 83 || event.rawcode === 40) {
      //win服的s键或者方向键下
      if (drift) {
        return
      }
      drift = true
      clearInterval(interval)
      update(colorsRed)
      interval = setInterval(() => update(colorsRed), 1500)
    } else if (event.rawcode === 32) {
      // win服的空格键
      if (!drift) {
        return
      }
      drift = false
      clearInterval(interval)
      update(colorsGreen)
      interval = setInterval(() => update(colorsGreen), 1500)
    }
  })

  // Register and start hook
  ioHook.start()
  /*
		- your code -
	*/

  // await client.disconnect()
}

start()

// Alternatively, pass true to start in DEBUG mode.
// ioHook.start(true)

// False to disable DEBUG. Cleaner terminal output.
// ioHook.start(false)
