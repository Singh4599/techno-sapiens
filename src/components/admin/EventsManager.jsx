import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, X, Upload, Calendar, MapPin, Users, DollarSign } from 'lucide-react';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import useData from '@hooks/useData';
import { eventsService, uploadImage } from '@services/api';
import { EVENT_CATEGORIES } from '@utils/constants';
import ShinyCard from '@components/admin/ShinyCard';

const EventsManager = () => {
  const { data: events, loading, create, update, remove } = useData(eventsService);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    category: 'Hackathon',
    date: '',
    time: '',
    venue: '',
    prize_pool: 0,
    team_size_min: 1,
    team_size_max: 1,
    registration_fee: 0,
    image_url: '',
    status: 'draft'
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'name' && !editingEvent ? { slug: value.toLowerCase().replace(/\s+/g, '-') } : {})
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setUploading(true);
    
    const { data, error } = await uploadImage(file);
    if (!error && data) {
      setFormData(prev => ({ ...prev, image_url: data.url }));
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (editingEvent) {
      await update(editingEvent.id, formData);
    } else {
      await create(formData);
    }
    
    resetForm();
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData(event);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await remove(id);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      category: 'Hackathon',
      date: '',
      time: '',
      venue: '',
      prize_pool: 0,
      team_size_min: 1,
      team_size_max: 1,
      registration_fee: 0,
      image_url: '',
      status: 'draft'
    });
    setEditingEvent(null);
    setShowForm(false);
    setImageFile(null);
  };

  if (loading) {
    return <div className="text-center py-16"><p className="text-text-secondary">Loading events...</p></div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Manage Events</h2>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            leftIcon={<Plus className="w-5 h-5" />}
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:shadow-lg hover:shadow-primary/50"
          >
            Add New Event
          </Button>
        </motion.div>
      </div>

      {/* Events Table */}
      <ShinyCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-4 text-text-secondary font-medium">Image</th>
                <th className="text-left py-4 px-4 text-text-secondary font-medium">Name</th>
                <th className="text-left py-4 px-4 text-text-secondary font-medium">Category</th>
                <th className="text-left py-4 px-4 text-text-secondary font-medium">Date</th>
                <th className="text-left py-4 px-4 text-text-secondary font-medium">Prize Pool</th>
                <th className="text-left py-4 px-4 text-text-secondary font-medium">Status</th>
                <th className="text-right py-4 px-4 text-text-secondary font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-4 px-4">
                    <img 
                      src={event.image_url} 
                      alt={event.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-4 px-4 text-text-primary font-medium">{event.name}</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm">
                      {event.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-text-secondary">{event.date}</td>
                  <td className="py-4 px-4 text-text-secondary">₹{event.prize_pool.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      event.status === 'published' 
                        ? 'bg-success/10 text-success border border-success/30' 
                        : 'bg-warning/10 text-warning border border-warning/30'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(event)}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4 text-primary" />
                      </button>
                      <button 
                        onClick={() => handleDelete(event.id)}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-error" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ShinyCard>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetForm}
          >
            <motion.div
              className="bg-background-surface border border-white/10 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold gradient-text">
                  {editingEvent ? 'Edit Event' : 'Add New Event'}
                </h3>
                <button onClick={resetForm} className="p-2 hover:bg-white/5 rounded-lg">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Event Image</label>
                  <div className="flex items-center gap-4">
                    {formData.image_url && (
                      <img src={formData.image_url} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                    )}
                    <label className="flex-1 cursor-pointer">
                      <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <p className="text-text-secondary">
                          {uploading ? 'Uploading...' : 'Click to upload image'}
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Event Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 bg-background border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>

                {/* Category & Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-primary"
                    >
                      {EVENT_CATEGORIES.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-primary"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Input
                    label="Date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Venue"
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Numbers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Prize Pool (₹)"
                    name="prize_pool"
                    type="number"
                    value={formData.prize_pool}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Registration Fee (₹)"
                    name="registration_fee"
                    type="number"
                    value={formData.registration_fee}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Team Size */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Min Team Size"
                    name="team_size_min"
                    type="number"
                    value={formData.team_size_min}
                    onChange={handleInputChange}
                    min="1"
                  />
                  <Input
                    label="Max Team Size"
                    name="team_size_max"
                    type="number"
                    value={formData.team_size_max}
                    onChange={handleInputChange}
                    min="1"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 justify-end">
                  <Button variant="outline" onClick={resetForm} type="button">
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingEvent ? 'Update Event' : 'Create Event'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventsManager;
