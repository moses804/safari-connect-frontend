import TransportCard from './TransportCard';

const TransportList = ({ transports }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Available Transports</h2>
      
      {transports.length === 0 ? (
        <p className="text-gray-500">No transports found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {transports.map(transport => (
            <TransportCard key={transport.id} transport={transport} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TransportList;