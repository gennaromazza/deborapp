const MissionBanner = ({ mission, completed, profile, difficulty, progress }) => (
  <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 rounded-2xl px-6 py-3 shadow-lg text-center transition-all duration-500 max-w-xs ${completed ? 'scale-95 opacity-70' : 'scale-100'}`}>
    {difficulty && (
      <p className="text-xs font-bold text-purple-500 mb-1">{difficulty}</p>
    )}
    <p className="text-lg font-bold text-purple-700">
      {completed
        ? `🎉 Ottimo lavoro${profile ? `, ${profile.childName}` : ''}!`
        : `🎯 ${mission}`}
    </p>
    {progress && (
      <p className="text-xs text-gray-500 mt-1">{progress}</p>
    )}
  </div>
)

export default MissionBanner