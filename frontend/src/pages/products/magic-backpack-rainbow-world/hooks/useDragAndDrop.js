import { useState, useRef, useCallback, useEffect } from 'react'

export function useDragAndDrop({ onDrop, onDragStart, onDragEnd }) {
  const [draggingObj, setDraggingObj] = useState(null)
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 })
  const [dropZone, setDropZone] = useState(null)
  const [isOverDropZone, setIsOverDropZone] = useState(false)
  const animFrame = useRef(null)
  const moveHandlerRef = useRef(null)
  const endHandlerRef = useRef(null)

  const cleanupListeners = useCallback(() => {
    if (moveHandlerRef.current) {
      document.removeEventListener('mousemove', moveHandlerRef.current)
      document.removeEventListener('touchmove', moveHandlerRef.current)
      moveHandlerRef.current = null
    }

    if (endHandlerRef.current) {
      document.removeEventListener('mouseup', endHandlerRef.current)
      document.removeEventListener('touchend', endHandlerRef.current)
      document.removeEventListener('touchcancel', endHandlerRef.current)
      endHandlerRef.current = null
    }
  }, [])

  const handleStart = useCallback((event, obj) => {
    if (!obj) return

    event.preventDefault()
    cleanupListeners()

    const clientX = event.touches?.[0]?.clientX ?? event.clientX
    const clientY = event.touches?.[0]?.clientY ?? event.clientY

    setDraggingObj(obj)
    setDragPos({ x: clientX, y: clientY })

    if (typeof onDragStart === 'function') {
      onDragStart(obj)
    }

    const handleMove = (moveEvent) => {
      moveEvent.preventDefault()
      const cx = moveEvent.touches?.[0]?.clientX ?? moveEvent.clientX
      const cy = moveEvent.touches?.[0]?.clientY ?? moveEvent.clientY

      if (animFrame.current) cancelAnimationFrame(animFrame.current)
      animFrame.current = requestAnimationFrame(() => {
        setDragPos({ x: cx, y: cy })

        if (dropZone) {
          const rect = dropZone.getBoundingClientRect()
          const over = cx >= rect.left - 30 && cx <= rect.right + 30 && cy >= rect.top - 30 && cy <= rect.bottom + 30
          setIsOverDropZone(over)
        }
      })
    }

    const handleEnd = (endEvent) => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current)
      cleanupListeners()

      const endX = endEvent.changedTouches?.[0]?.clientX ?? endEvent.clientX
      const endY = endEvent.changedTouches?.[0]?.clientY ?? endEvent.clientY

      let dropped = false
      if (dropZone) {
        const rect = dropZone.getBoundingClientRect()
        const over = endX >= rect.left - 30 && endX <= rect.right + 30 && endY >= rect.top - 30 && endY <= rect.bottom + 30

        if (over && typeof onDrop === 'function') {
          dropped = onDrop(obj, { x: endX, y: endY })
        }
      }

      if (!dropped && typeof onDragEnd === 'function') {
        onDragEnd(obj)
      }

      setDraggingObj(null)
      setIsOverDropZone(false)
    }

    moveHandlerRef.current = handleMove
    endHandlerRef.current = handleEnd

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleEnd)
    document.addEventListener('touchmove', handleMove, { passive: false })
    document.addEventListener('touchend', handleEnd)
    document.addEventListener('touchcancel', handleEnd)
  }, [cleanupListeners, dropZone, onDrop, onDragStart, onDragEnd])

  const registerDropZone = useCallback((element) => {
    setDropZone(element)
  }, [])

  useEffect(() => {
    return () => {
      cleanupListeners()
      if (animFrame.current) cancelAnimationFrame(animFrame.current)
    }
  }, [cleanupListeners])

  return {
    draggingObj,
    dragPos,
    isOverDropZone,
    handleStart,
    registerDropZone,
  }
}
