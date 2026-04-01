import { useRef, useEffect, useState } from 'react'

export default function AvatarCreator({ photoUrl, childName, onAvatarCreated }) {
  const canvasRef = useRef(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(null)

  useEffect(() => {
    if (photoUrl) {
      processAvatar(photoUrl)
    }
  }, [photoUrl])

  const processAvatar = (imageUrl) => {
    setIsProcessing(true)
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const size = 300

      canvas.width = size
      canvas.height = size

      // Clip to circle
      ctx.beginPath()
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()

      // Draw image with cartoon effect
      ctx.drawImage(img, 0, 0, size, size)

      // Cartoon effect: posterize colors
      const imageData = ctx.getImageData(0, 0, size, size)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        // Posterize - reduce color levels
        const levels = 6
        data[i] = Math.round(Math.round(data[i] / 255 * (levels - 1)) / (levels - 1) * 255)
        data[i + 1] = Math.round(Math.round(data[i + 1] / 255 * (levels - 1)) / (levels - 1) * 255)
        data[i + 2] = Math.round(Math.round(data[i + 2] / 255 * (levels - 1)) / (levels - 1) * 255)

        // Boost saturation
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
        data[i] = Math.min(255, data[i] + (data[i] - avg) * 0.3)
        data[i + 1] = Math.min(255, data[i + 1] + (data[i + 1] - avg) * 0.3)
        data[i + 2] = Math.min(255, data[i + 2] + (data[i + 2] - avg) * 0.3)

        // Boost contrast
        data[i] = Math.min(255, Math.max(0, ((data[i] / 255 - 0.5) * 1.2 + 0.5) * 255))
        data[i + 1] = Math.min(255, Math.max(0, ((data[i + 1] / 255 - 0.5) * 1.2 + 0.5) * 255))
        data[i + 2] = Math.min(255, Math.max(0, ((data[i + 2] / 255 - 0.5) * 1.2 + 0.5) * 255))
      }

      ctx.putImageData(imageData, 0, 0)

      // Draw cartoon border
      ctx.beginPath()
      ctx.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2)
      ctx.strokeStyle = '#8B5CF6'
      ctx.lineWidth = 8
      ctx.stroke()

      // Inner glow
      const gradient = ctx.createRadialGradient(size / 2, size / 2, size / 3, size / 2, size / 2, size / 2)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
      gradient.addColorStop(1, 'rgba(139, 92, 246, 0.2)')
      ctx.fillStyle = gradient
      ctx.fill()

      // Draw backpack overlay
      ctx.font = '60px serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('🎒', size / 2 + 80, size / 2 + 80)

      // Sparkle effects
      ctx.font = '24px serif'
      ctx.fillText('✨', size / 2 - 80, size / 2 - 80)
      ctx.fillText('✨', size / 2 + 90, size / 2 - 60)

      const resultUrl = canvas.toDataURL('image/png', 0.9)
      setAvatarUrl(resultUrl)
      setIsProcessing(false)
      onAvatarCreated?.(resultUrl)
    }
    img.src = imageUrl
  }

  return (
    <div className="relative inline-block">
      <canvas ref={canvasRef} className="hidden" />
      {avatarUrl && (
        <div className="relative">
          <img
            src={avatarUrl}
            alt={`Avatar di ${childName}`}
            className="w-32 h-32 rounded-3xl shadow-lg"
          />
          {isProcessing && (
            <div className="absolute inset-0 bg-purple-500 bg-opacity-50 rounded-3xl flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
