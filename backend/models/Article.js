const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  publishedDate: {
    type: Date
  },
  author: {
    type: String,
    default: 'Unknown'
  },
  imageUrl: {
    type: String
  },
  excerpt: {
    type: String
  },
  isUpdated: {
    type: Boolean,
    default: false
  },
  updatedContent: {
    type: String
  },
  references: [{
    title: String,
    url: String,
    scrapedAt: Date
  }],

  // Metadata
  scrapedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
}, {
  timestamps: true
});

articleSchema.index({ title: 'text', content: 'text' });
articleSchema.index({ publishedDate: -1 });
articleSchema.index({ isUpdated: 1 });

module.exports = mongoose.model('Article', articleSchema);
