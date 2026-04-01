export default function AvatarDisplay({ avatarUrl, childName, size = 'md', showName = true }) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
  }

  if (avatarUrl) {
    return (
      <div className="flex flex-col items-center">
        <div className={`relative ${sizeClasses[size]}`}>
          <img
            src={avatarUrl}
            alt={`Avatar di ${childName}`}
            className="w-full h-full object-cover rounded-3xl shadow-lg"
          />
          <div className="absolute -bottom-2 -right-2 text-2xl">🎒</div>
        </div>
        {showName && childName && (
          <p className="mt-2 font-bold text-white drop-shadow-lg text-sm">
            {childName} ⭐
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl flex items-center justify-center shadow-lg`}>
        <span className="text-4xl">👤</span>
      </div>
      {showName && childName && (
        <p className="mt-2 font-bold text-white drop-shadow-lg text-sm">
          {childName} ⭐
        </p>
      )}
    </div>
  )
}
