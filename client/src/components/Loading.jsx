const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-600"></div>
        <p className="mt-4 text-lg text-indigo-400 font-semibold">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;