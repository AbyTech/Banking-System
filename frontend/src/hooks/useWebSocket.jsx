import { useEffect, useRef } from 'react'
import { websocketService } from '../services/websocket'

export const useWebSocket = (events = {}) => {
  const eventHandlers = useRef(events)

  useEffect(() => {
    eventHandlers.current = events
  }, [events])

  useEffect(() => {
    // Connect to WebSocket
    websocketService.connect()

    // Set up event listeners
    Object.entries(eventHandlers.current).forEach(([event, handler]) => {
      if (typeof handler === 'function') {
        websocketService.on(event, handler)
      }
    })

    // Cleanup on unmount
    return () => {
      Object.keys(eventHandlers.current).forEach(event => {
        websocketService.off(event, eventHandlers.current[event])
      })
    }
  }, [])

  const sendMessage = (message) => {
    websocketService.sendMessage(message)
  }

  return { sendMessage }
}