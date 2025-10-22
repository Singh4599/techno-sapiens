import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { GALLERY_CATEGORIES } from '@utils/constants';

// Sample gallery data
const sampleImages = [
  { id: 1, category: 'day1', caption: 'Opening Ceremony', image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop' },
  { id: 2, category: 'day1', caption: 'Keynote Speech', image_url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format&fit=crop' },
  { id: 3, category: 'workshops', caption: 'AI Workshop', image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop' },
  { id: 4, category: 'hackathon', caption: 'Hackathon Teams', image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop' },
  { id: 5, category: 'day2', caption: 'Tech Talks', image_url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&auto=format&fit=crop' },
  { id: 6, category: 'cultural', caption: 'Cultural Night', image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop' },
  { id: 7, category: 'workshops', caption: 'Web Dev Workshop', image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop' },
  { id: 8, category: 'hackathon', caption: 'Coding Session', image_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop' },
  { id: 9, category: 'awards', caption: 'Prize Distribution', image_url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&auto=format&fit=crop' },
  { id: 10, category: 'day3', caption: 'Closing Ceremony', image_url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&auto=format&fit=crop' },
  { id: 11, category: 'cultural', caption: 'Dance Performance', image_url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&auto=format&fit=crop' },
  { id: 12, category: 'awards', caption: 'Winners', image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop' },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages = sampleImages.filter(
    img => selectedCategory === 'all' || img.category === selectedCategory
  );

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-4">
            Gallery
          </h1>
          <p className="text-text-secondary text-lg">
            Relive the memorable moments from our tech fest
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {GALLERY_CATEGORIES.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category.value
                  ? 'bg-primary text-black'
                  : 'bg-background-surface text-text-secondary hover:bg-white/5 border border-white/10'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedImage(image)}
              whileHover={{ scale: 1.05, rotateZ: 2 }}
            >
              {/* Image */}
              {image.image_url && (
                <img 
                  src={image.image_url} 
                  alt={image.caption}
                  className="w-full h-full object-cover"
                />
              )}
              
              {/* Animated Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <div className="text-center transform group-hover:scale-110 transition-transform duration-500">
                  <p className="text-white font-bold text-xl mb-2">{image.caption}</p>
                  <p className="text-white/80 text-sm">Click to view</p>
                </div>
              </div>

              {/* Neon Border Glow */}
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] transition-all duration-300 rounded-xl" />
              
              {/* Corner Accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </button>

              <motion.div
                className="relative max-w-4xl w-full aspect-video bg-gradient-to-br from-primary/30 to-secondary/30 rounded-xl"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold gradient-text mb-2">
                      {selectedImage.caption}
                    </h3>
                    <p className="text-text-secondary">Image Preview</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;
