import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
        setResults(response.data);
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to fetch search results. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark mb-2">
            Search Results for "{query}"
          </h1>
          <p className="text-gray-600">
            Found {results.length} result{results.length !== 1 ? 's' : ''}
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {results.length === 0 && !error ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No results found</h2>
            <p className="text-gray-500 mb-6">
              Try adjusting your search terms or browse our categories.
            </p>
            <Link 
              to="/careers" 
              className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
            >
              Browse Careers
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((career, index) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 flex flex-col h-full"
              >
                <div className="mb-4">
                  <span className="text-xs font-semibold px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                    {career.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-dark mb-2">{career.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {career.overview}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <Link 
                    to={`/careers/detail/${career.id}`}
                    className="text-primary font-semibold text-sm hover:underline block"
                  >
                    Read Full Details →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
