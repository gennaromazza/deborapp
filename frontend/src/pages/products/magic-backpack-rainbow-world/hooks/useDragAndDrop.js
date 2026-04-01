import { useState, useRef, useCallback, useEffect } from 'react'

export function useDragAndDrop({ onDrop, onDragStart, onDragEnd }) {
  const [draggingObj, setDraggingObj] = useState(null)
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 })
  const [dropZone, setDropZone] = useState(null)
  const [isOverDropZone, setIsOverDropZone] = useState(false)
  const dragStartPos = useRef(null)
  const animFrame = useRef(null)

  const handleStart = useCallback((e, obj) => {
    e.preventDefault()
    const clientX = e.touches?.[0]?.clientX ?? e.clientX
    const clientY = e.touches?.[0]?.clientY ?? e.clientY
    
    dragStartPos.current = { x: clientX, y: clientY }
    setDraggingObj(obj)
    setDragPos({ x: clientX, y: clientY })
    
    if (onDragStart) onDragStart(obj)

    const handleMove = (ev) => {
      ev.preventDefault()
      const cx = ev.touches?.[0]?.clientX ?? ev.clientX
      const cy = ev.touches?.[0]?.clientY ?? ev.clientY
      
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

    const handleEnd = (ev) => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current)
      
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleEnd)
      document.removeEventListener('touchmove', handleMove, { passive: false })
      document.removeEventListener('touchend', handleEnd)

      const endX = ev.changedTouches?.[0]?.clientX ?? ev.clientX
      const endY = ev.changedTouches?.[0]?.clientY ?? ev.clientY

      let dropped = false
      if (dropZone) {
        const rect = dropZone.getBoundingClientRect()
        const over = endX >= rect.left - 30 && endX <= rect.right + 30 && endY >= rect.top - 30 && endY <= rect.bottom + 30
        if (over && onDrop) {
          dropped = onDrop(obj, { x: endX, y: endY })
        }
      }

      if (!dropped && onDragEnd) {
        onDragEnd(obj)
      }

      setDraggingObj(null)
      setIsOverDropZone(false)
    }

    document.addEventListener('mousemove', handleMove, { passive: false })
    document.addEventListener('mouseup', handleEnd)
    document.addEventListener('touchmove', handleMove, { passive: false })
    document.addEventListener('touchend', handleEnd)
  }, [dropZone, onDrop, onDragStart, onDragEnd])

  const registerDropZone = useCallback((element) => {
    setDropZone(element)
  }, [])

  useEffect(() => {
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current)
    }
  }, [])

  return {
    draggingObj,
    dragPos,
    isOverDropZone,
    handleStart,
    registerDropZone,
  }
}