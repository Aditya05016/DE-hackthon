const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
            D
          </div>
          <h1 className="text-4xl font-bold text-purple-600">digitalflake</h1>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to Digitalflake admin</h2>
        <p className="text-gray-600">Manage your categories, subcategories, and products from the sidebar.</p>
      </div>
    </div>
  );
};

export default Home;


