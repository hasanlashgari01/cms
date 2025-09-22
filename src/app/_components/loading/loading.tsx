const Loading: React.FC = () => {
  return (
    <div className="box flex h-[400px] flex-col items-center justify-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      <p className="animate-pulse text-xl font-bold text-indigo-600">در حال بارگذاری...</p>
    </div>
  );
};

export default Loading;
