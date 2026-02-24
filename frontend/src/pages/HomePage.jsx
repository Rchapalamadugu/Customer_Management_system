import { useState, useMemo } from 'react';
import CustomerList from '../components/CustomerList';
import CustomerForm from '../components/CustomerForm';
import SearchBar from '../components/SearchBar';
import ViewCustomerModal from '../components/ViewCustomerModal';
import { UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

// Mock data for Step 1 (will be replaced with API calls in Step 2)
const initialCustomers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '5551234567',
    accountNumber: 'ACC-100001',
    address: '123 Main St, New York, NY',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '5559876543',
    accountNumber: 'ACC-100002',
    address: '456 Oak Ave, Los Angeles, CA',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '5555551234',
    accountNumber: 'ACC-100003',
    address: '789 Pine Rd, Chicago, IL',
  },
];

const HomePage = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [viewingCustomer, setViewingCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading] = useState(false);

  const filteredCustomers = useMemo(() => {
    if (!searchTerm.trim()) return customers;
    const term = searchTerm.toLowerCase();
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term) ||
        c.phone.includes(term)
    );
  }, [customers, searchTerm]);

  const handleAddCustomer = (formData) => {
    if (editingCustomer) {
      // Update
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === editingCustomer.id ? { ...c, ...formData } : c
        )
      );
      setEditingCustomer(null);
      toast.success('Customer updated successfully!');
    } else {
      // Create
      const newCustomer = {
        id: Date.now(),
        ...formData,
      };
      setCustomers((prev) => [...prev, newCustomer]);
      toast.success('Customer added successfully!');
    }
  };

  const handleView = (customer) => {
    setViewingCustomer(customer);
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
      toast.success('Customer deleted successfully!');
    }
  };

  const handleCancelEdit = () => {
    setEditingCustomer(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Customer Management
        </h1>
        <p className="text-gray-400">
          Manage your bank customers — add, view, update, and delete records.
        </p>
      </div>

      {/* Form */}
      <div className="mb-8">
        <CustomerForm
          onSubmit={handleAddCustomer}
          editingCustomer={editingCustomer}
          onCancelEdit={handleCancelEdit}
        />
      </div>

      {/* Search + Count */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-gray-300">
          <UserPlus className="h-5 w-5 text-blue-400" />
          <span className="text-sm font-medium">
            {filteredCustomers.length} customer{filteredCustomers.length !== 1 ? 's' : ''}
            {searchTerm && ' found'}
          </span>
        </div>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClear={() => setSearchTerm('')}
        />
      </div>

      {/* Table */}
      <CustomerList
        customers={filteredCustomers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        loading={loading}
      />

      {/* View Modal */}
      {viewingCustomer && (
        <ViewCustomerModal
          customer={viewingCustomer}
          onClose={() => setViewingCustomer(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
