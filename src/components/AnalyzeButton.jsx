function AnalyzeButton({ onClick, loading }) {
  return (
    <div className="max-w-4xl mx-auto text-center mt-8">

      <button
        onClick={onClick}
        disabled={loading}
        className="
          bg-blue-800
          hover:bg-blue-900
          text-white
          text-xl
          font-semibold
          px-12
          py-5
          rounded-2xl
          shadow-xl
          transition
          hover:scale-105
          disabled:opacity-50
        "
      >
        {loading ? "Analyzing..." : "Analyze Product"}
      </button>

    </div>
  );
}

export default AnalyzeButton;