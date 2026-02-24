import { useNavigate } from 'react-router-dom';
import CustomerForm from '../components/CustomerForm';
import toast from 'react-hot-toast';

const AddCustomerPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    // For now, just log and redirect (will be replaced with API call in Step 2)
    console.log('New customer:', formData);
    toast.success('Customer added successfully!');
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Add New Customer</h1>
        <p className="text-gray-400">Fill in the details below to register a new customer.</p>
      </div>
      <CustomerForm onSubmit={handleSubmit} editingCustomer={null} onCancelEdit={null} />
    </div>
  );
};

export default AddCustomerPage;
