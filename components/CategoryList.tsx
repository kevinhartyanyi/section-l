'use client';

interface Category {
    name: string;
    count: number;
}

interface CategoryListProps {
    categories: Category[];
    loading: boolean;
    onSelectCategory: (category: string) => void;
}

export default function CategoryList({ categories, loading, onSelectCategory }: CategoryListProps) {
    return (
        <>
            <h1 className="text-3xl font-light mb-2 text-gray-800">City Gems</h1>
            <p className="text-gray-500 mb-8">Explore local recommendations by category</p>

            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : (
                <>
                    {categories.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {categories.map((category) => (
                                <div
                                    key={category.name}
                                    onClick={() => onSelectCategory(category.name)}
                                    className="p-6 border border-gray-300 hover:border-gray-500 transition-colors cursor-pointer"
                                >
                                    <h3 className="text-lg font-light text-gray-800 mb-2">
                                        {category.name}
                                    </h3>
                                    <p className="text-2xl font-light text-gray-600">
                                        {category.count} {category.count === 1 ? 'place' : 'places'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No city gems found for this property</p>
                    )}
                </>
            )}
        </>
    );
}