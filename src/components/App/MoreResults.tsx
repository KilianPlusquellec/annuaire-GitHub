type MoreResultsProps = {
  nextPage: () => void;
};

function MoreResults({ nextPage }: MoreResultsProps) {
  return (
    <div className="text-center mt-8">
      <button
        type="button"
        onClick={nextPage}
        className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-xl shadow-soft hover:shadow-medium transition-all duration-200 hover:scale-105 inline-flex items-center"
      >
        <span>Charger plus de résultats</span>
        <svg
          className="w-5 h-5 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>
    </div>
  );
}

export default MoreResults;
