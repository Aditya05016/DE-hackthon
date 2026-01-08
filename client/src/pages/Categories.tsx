import { useState, useEffect } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { categoryAPI } from '../services/api';

interface Category {
  _id: string;
  name: string;
  image: string;
  status: boolean;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '', image: '', status: true });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<Category | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, image: value });
    setImagePreview(value);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch categories');
    }
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({ name: '', image: '', status: true });
    setImagePreview('');
    setIsModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      image: category.image || '',
      status: category.status,
    });
    setImagePreview(category.image || '');
    setIsModalOpen(true);
  };

  const handleDelete = (category: Category) => {
    setDeleteConfirm(category);
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await categoryAPI.delete(deleteConfirm._id);
      setDeleteConfirm(null);
      fetchCategories();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete category');
      setDeleteConfirm(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (editingCategory) {
        await categoryAPI.update(editingCategory._id, formData);
      } else {
        await categoryAPI.create(formData);
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save category');
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { key: 'name', header: 'NAME' },
    {
      key: 'image',
      header: 'IMAGE',
      render: (item: Category) => (
        <img
          src={item.image}
          alt={item.name}
          className="w-12 h-12 object-cover rounded"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50';
          }}
        />
      ),
    },
    {
      key: 'status',
      header: 'STATUS',
      render: (item: Category) => (
        <span className={item.status ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
          {item.status ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Purple Header Bar */}
      <div className="bg-purple-600 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <h1 className="text-xl font-bold text-white">Category</h1>
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-lg font-medium ml-4"
        >
          Add New
        </button>
      </div>

      <div className="p-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <Table
          data={filteredCategories}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title=""
      >
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-red-500 text-3xl mr-2">⚠️</span>
            <h3 className="text-xl font-bold text-gray-800">Delete</h3>
          </div>
          <p className="text-gray-600 mb-6">Are you sure you want to delete?</p>
          <div className="flex gap-3">
            <button
              onClick={() => setDeleteConfirm(null)}
              className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              Delete
            </button>
            <button
              onClick={confirmDelete}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${editingCategory ? 'Edit' : 'Add'} Category`}
        showBackButton={true}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter category name"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
            <select
              value={formData.status ? 'Active' : 'Inactive'}
              onChange={(e) => setFormData({ ...formData, status: e.target.value === 'Active' })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-3">Upload Image</label>
            <div className="flex gap-4">
              {/* Image Preview */}
              <div className="flex-1">
                {imagePreview ? (
                  <div className="border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-full max-h-32 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                      }}
                    />
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex items-center justify-center bg-gray-50">
                    <div className="text-center text-gray-400">
                      <div className="text-4xl mb-2">📷</div>
                      <p className="text-sm">No image preview</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Upload Input */}
              <div className="flex-1">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 h-full">
                  <div className="text-3xl mb-2">☁️</div>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={handleImageChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter image URL"
                  />
                  <p className="text-xs text-gray-500 text-center">
                    Upload Maximum allowed file size is 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 font-medium"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Categories;

