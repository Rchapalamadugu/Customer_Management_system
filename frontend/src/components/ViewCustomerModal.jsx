import { X, Mail, Phone, MapPin, CreditCard, User } from 'lucide-react';

const ViewCustomerModal = ({ customer, onClose }) => {
  if (!customer) return null;

  const fields = [
    { icon: User, label: 'Name', value: customer.name },
    { icon: Mail, label: 'Email', value: customer.email },
    { icon: Phone, label: 'Phone', value: customer.phone },
    { icon: CreditCard, label: 'Account Number', value: customer.accountNumber || 'ACC-' + String(customer.id).padStart(6, '0') },
    { icon: MapPin, label: 'Address', value: customer.address },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Customer Details</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Details */}
        <div className="space-y-4">
          {fields.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="bg-gray-800 p-2 rounded-lg mt-0.5">
                <Icon className="h-4 w-4 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5">
                  {label}
                </p>
                <p className="text-white text-sm break-words">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomerModal;
