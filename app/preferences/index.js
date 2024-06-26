const util = require('util')
const { preferenceConfig } = require('../config')
const { MessageReceiver } = require('ffc-messaging')
const { saveToCosmos } = require('./save-to-cosmos')

const handleMessage = async (message, receiver) => {
  try {
    console.log('Received message:', message.body)
    await saveToCosmos(message)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Message error', util.inspect(err.message, false, null, true))
  }
}

const startMessaging = async () => {
  let preferencesReceiver //eslint-disable-line
  const receiverAction = (message) =>
    handleMessage(message, preferencesReceiver)
  preferencesReceiver = new MessageReceiver(
    preferenceConfig.receiverSubscription,
    receiverAction
  )
  await preferencesReceiver.subscribe()
  console.info('Preferences receiver is ready to consume messages')
}

module.exports = { startMessaging }
