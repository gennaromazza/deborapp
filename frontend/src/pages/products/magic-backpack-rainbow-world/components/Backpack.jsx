const Backpack = ({ isOpen, animation, collectedItems, onToggle, objects, profile }) => {
  return (
    <div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center cursor-pointer"
      onClick={onToggle}
    >
      <div className={`text-6xl select-none ${animation}`} style={{ animation: 'float 3s ease-in-out infinite' }}>
        {isOpen ? '🎒✨' : '🎒'}
      </div>
      <p className="text-white text-sm mt-2 font-bold">
        {isOpen
          ? `Tocca per chiudere${profile ? `, ${profile.childName}` : ''}`
          : `Tocca per aprire${profile ? `, ${profile.childName}` : ''}`}
      </p>
      {isOpen && (
        <div className="bg-white bg-opacity-90 rounded-xl p-4 mt-2" style={{ animation: 'popIn 0.5s ease-out' }}>
          <p className="text-sm font-bold text-purple-700 mb-2">
            {profile ? `Parole di ${profile.childName}:` : 'Raccolte:'}
          </p>
          <div className="flex gap-3 justify-center">
            {objects.filter(o => collectedItems[o.id]).map(o => (
              <span key={o.id} className="text-3xl">{o.emoji}</span>
            ))}
            {Object.keys(collectedItems).length === 0 && (
              <span className="text-gray-400 text-sm">Vuoto...</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Backpack
