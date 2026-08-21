const Loader = ({ text = "Завантаження..." }: { text?: string }) => {
    return (
        <div className="flex min-h-40 w-full flex-col items-center justify-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>

            <p className="text-gray-500 text-lg">
                {text}
            </p>
        </div>
    );
};

export default Loader;