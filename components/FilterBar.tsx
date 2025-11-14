'use client';

interface FilterBarProps {
    sortBy: string;
    onSortChange: (value: string) => void;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    allTags: string[];
    selectedTags: string[];
    onToggleTag: (tag: string) => void;
    onClearFilters: () => void;
}

export default function FilterBar({
    sortBy,
    onSortChange,
    searchTerm,
    onSearchChange,
    allTags,
    selectedTags,
    onToggleTag,
    onClearFilters
}: FilterBarProps) {
    return (
        <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="flex flex-wrap gap-4 items-center">
                {/* Search */}
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Search:</span>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search descriptions..."
                        className="text-sm border border-gray-400 rounded px-3 py-1.5 text-gray-700 bg-white focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 min-w-[200px]"
                    />
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Sort:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="text-sm border border-gray-400 rounded px-3 py-1.5 text-gray-700 bg-white focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
                    >
                        <option value="none">Default</option>
                        <option value="name">Name (A-Z)</option>
                    </select>
                </div>

                {/* Tags Filter */}
                {allTags.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-gray-600">Filter:</span>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => onToggleTag(tag)}
                                className={`text-sm px-3 py-1 rounded transition-colors ${selectedTags.includes(tag)
                                        ? 'bg-gray-800 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                )}

                {/* Clear filters */}
                {(selectedTags.length > 0 || searchTerm) && (
                    <button
                        onClick={onClearFilters}
                        className="text-sm text-gray-500 hover:text-gray-700 underline"
                    >
                        Clear filters
                    </button>
                )}
            </div>
        </div>
    );
}