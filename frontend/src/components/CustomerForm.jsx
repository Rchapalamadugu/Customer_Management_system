import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  address: '',
  accountNumber: '',
};

const CustomerForm = ({ onSubmit, editingCustomer, onCancelEdit }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingCustomer) {
      setFormData({
        name: editingCustomer.name || '',
        email: editingCustomer.email || '',
        phone: editingCustomer.phone || '',
        address: editingCustomer.address || '',
        accountNumber: editingCustomer.accountNumber || '',
      });
    } else {
      setFormData(emptyForm);
    }
    setErrors({});
  }, [editingCustomer]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    } else if (!/^ACC-\d{6}$/.test(formData.accountNumber)) {
      newErrors.accountNumber = 'Account number must be in format ACC-123456';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(formData);
    setFormData(emptyForm);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCancel = () => {
    setFormData(emptyForm);
    setErrors({});
    if (onCancelEdit) onCancelEdit();
  };

  const inputClass = (field) =>
    `w-full px-4 py-2.5 bg-gray-800 border rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
      errors[field]
        ? 'border-red-500 focus:ring-red-500'
        : 'border-gray-700 focus:ring-blue-500'
    }`;

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6">
        {editingCustomer ? 'Update Customer' : 'Add New Customer'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            className={inputClass('name')}
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className={inputClass('email')}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
            className={inputClass('phone')}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
        </div>

        {/* Account Number */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            placeholder="ACC-123456"
            className={inputClass('accountNumber')}
          />
          {errors.accountNumber && <p className="mt-1 text-xs text-red-400">{errors.accountNumber}</p>}
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            className={inputClass('address')}
          />
          {errors.address && <p className="mt-1 text-xs text-red-400">{errors.address}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-md transition-colors"
        >
          <Save className="h-4 w-4" />
          {editingCustomer ? 'Update' : 'Save'}
        </button>
        {editingCustomer && (
          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CustomerForm;
