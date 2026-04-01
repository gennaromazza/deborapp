const MissionBanner = ({ mission, completed, profile }) => (
  <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 rounded-2xl px-6 py-3 shadow-lg text-center transition-all duration-500 ${completed ? 'scale-95 opacity-70' : 'scale-100'}`}>
    <p className="text-lg font-bold text-purple-700">
      {completed
        ? `🎉 Ottimo lavoro${profile ? `, ${profile.childName}` : ''}!`
        : `🎯 ${mission}`}
    </p>
  </div>
)

export default MissionBanner
