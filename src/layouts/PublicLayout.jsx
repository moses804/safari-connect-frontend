const PublicLayout = ({ children }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Discover Amazing Travel Experiences
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find the perfect accommodation and transportation for your next adventure.
          Connect with local hosts and drivers for an authentic experience.
        </p>
      </div>
      {children}
    </div>
  )
}

export default PublicLayout