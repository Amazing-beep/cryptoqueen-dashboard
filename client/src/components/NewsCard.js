import React from 'react';
import { ExternalLink, Calendar, User } from 'lucide-react';

const NewsCard = ({ article }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text, maxLength = 120) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="card card-hover h-full">
      <div className="h-full flex flex-col">
        {/* Image */}
        {article.urlToImage && (
          <div className="mb-4">
            <img 
              src={article.urlToImage} 
              alt={article.title}
              className="w-full h-48 object-cover rounded-lg"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {article.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 flex-1">
            {truncateText(article.description)}
          </p>

          {/* Meta information */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <User className="w-3 h-3" />
                <span>{article.author || 'Unknown Author'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                {article.source.name}
              </span>
              
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
              >
                <span>Read More</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard; 