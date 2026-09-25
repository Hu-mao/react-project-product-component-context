
import { useSearchParams } from "react-router";

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const title = searchParams.get("title");

    return (
        <div className="rounded-xl bg-white p-8 shadow-sm">
            <h1 className="mb-6 text-3xl font-bold text-gray-900">
                Search
            </h1>

            <div className="flex gap-3">
                <input
                    type="text"
                    value={title ?? ""}
                    onChange={(e) =>
                        setSearchParams(
                            e.target.value
                                ? { title: e.target.value }
                                : {}
                        )
                    }
                    placeholder="Search product..."
                    className="w-full max-w-md rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

                <button
                    onClick={() =>
                        setSearchParams({ title: "furniture" })
                    }
                    className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                >
                    Search
                </button>
            </div>

            {title && (
                <p className="mt-6 text-gray-600">
                    Search list: <span className="font-semibold">{title}</span>
                </p>
            )}
        </div>
    );
};

export default Search;

