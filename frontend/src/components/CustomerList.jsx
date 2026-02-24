import { Pencil, Trash2, Users, Eye } from 'lucide-react';

const CustomerList = ({ customers, onEdit, onDelete, onView, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-400 text-sm">Loading customers...</span>
      </div>
    );
  }

  if (!customers || customers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <Users className="h-12 w-12 mb-3 opacity-50" />
        <p className="text-lg font-medium">No customers found</p>
        <p className="text-sm mt-1">Add a new customer to get started</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-800 shadow-lg">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-900 text-gray-300 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-4 font-semibold">#</th>
            <th className="px-6 py-4 font-semibold">Name</th>
            <th className="px-6 py-4 font-semibold">Email</th>
            <th className="px-6 py-4 font-semibold">Phone</th>
            <th className="px-6 py-4 font-semibold">Account Number</th>
            <th className="px-6 py-4 font-semibold">Address</th>
            <th className="px-6 py-4 font-semibold text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {customers.map((customer, index) => (
            <tr
              key={customer.id}
              className="bg-gray-950 hover:bg-gray-900 transition-colors"
            >
              <td className="px-6 py-4 text-gray-400 font-mono">{index + 1}</td>
              <td className="px-6 py-4 text-white font-medium">{customer.name}</td>
              <td className="px-6 py-4 text-gray-300">{customer.email}</td>
              <td className="px-6 py-4 text-gray-300">{customer.phone}</td>
              <td className="px-6 py-4 text-gray-300 font-mono">{customer.accountNumber || 'ACC-' + String(customer.id).padStart(6, '0')}</td>
              <td className="px-6 py-4 text-gray-300">{customer.address}</td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onView(customer)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded-md text-xs font-medium transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </button>
                  <button
                    onClick={() => onEdit(customer)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600/20 text-amber-400 hover:bg-amber-600/30 rounded-md text-xs font-medium transition-colors"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(customer.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded-md text-xs font-medium transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
