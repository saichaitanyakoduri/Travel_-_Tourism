import { Calendar, User } from 'lucide-react';

const Blog = () => {
  const defaultImage =
    'https://via.placeholder.com/400x300?text=No+Image+Available';
  const posts = [
    {
      title: 'Top 10 Tourist Destinations in India',
      excerpt: 'Discover the most beautiful and culturally rich destinations across India...',
      image: 'https://www.fabhotels.com/blog/wp-content/uploads/2022/01/cliched-destinations-in-india-feature-image-600X400.jpg',
      author: 'Priya Sharma',
      date: 'March 15, 2024',
      category: 'Travel Guide',
    },
    {
      title: 'Budget Travel Tips for Solo Travelers',
      excerpt: 'Essential tips and tricks for traveling solo on a budget in India...',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6XJ4MPgH33nXSD1dJwinu6zGvwIOgjltUTw&s',
      author: 'Rahul Verma',
      date: 'March 12, 2024',
      category: 'Travel Tips',
    },
    {
      title: 'Best Season to Visit Different Parts of India',
      excerpt: 'A comprehensive guide to planning your trips according to seasons...',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNhca_--A1WJCsppnQ4wIWKh5znHupnofVyQ&s',
      author: 'Amit Patel',
      date: 'March 10, 2024',
      category: 'Travel Guide',
    },
  ];

  const handleLoadMore = () => {
    // Placeholder for load more functionality
    console.log('Load more posts clicked');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Travel Blog</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover travel tips, guides, and stories from around India.
        </p>
      </div>

      {/* Blog Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <article
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={post.image || defaultImage}
              alt={`${post.title} - Image`}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="text-sm text-blue-600 font-semibold mb-2">
                {post.category}
              </div>
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {post.date}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-12 text-center">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          onClick={handleLoadMore}
        >
          Load More Posts
        </button>
      </div>
    </div>
  );
};

export default Blog;
