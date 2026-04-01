const RewardPopup = ({ message, visible }) => {
  if (!visible) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-gradient-to-r from-yellow-300 to-orange-400 rounded-3xl px-8 py-6 shadow-2xl" style={{ animation: 'popIn 0.5s ease-out' }}>
        <p className="text-3xl font-bold text-white text-center">{message}</p>
        <div className="text-5xl text-center mt-2">🎉✨🎒</div>
      </div>
    </div>
  )
}

export default RewardPopup
