import AccommodationCard from './AccommodationCard';

const AccommodationList = ({ accommodations }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Available Accommodations</h2>
      
      {accommodations.length === 0 ? (
        <p className="text-gray-500">No accommodations found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accommodations.map(accommodation => (
            <AccommodationCard key={accommodation.id} accommodation={accommodation} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AccommodationList;