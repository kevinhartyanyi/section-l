'use client';

import { CityGem } from "@/lib/types";
import { useRouter } from "next/navigation";

interface CategoryGemsProps {
    selectedCategory: string;
    selectedCategoryGems: CityGem[];
    onBack: () => void;
}

export default function CategoryGems({ selectedCategory, selectedCategoryGems, onBack }: CategoryGemsProps) {
    const router = useRouter();

    console.log(selectedCategoryGems)

    return (
        <>
            <button
                onClick={onBack}
                className="mb-4 text-gray-600 hover:text-gray-800 transition-colors"
            >
                ← Back to categories
            </button>
            <h1 className="text-3xl font-light mb-2 text-gray-800">{selectedCategory}</h1>
            <p className="text-gray-500 mb-8">{selectedCategoryGems.length} places</p>

            <div className="space-y-4">
                {selectedCategoryGems.map((gem) => (
                    <div
                        key={gem.id}
                        onClick={() => router.push(`/gems/${gem.id}`)}
                        className="p-6 border border-gray-300 hover:border-gray-500 transition-colors cursor-pointer"
                    >
                        <h3 className="text-xl font-light text-gray-800 mb-2">
                            {gem.name}
                        </h3>
                        <p className="text-gray-600 mb-3">
                            {gem.shortDescription}
                        </p>
                        {gem.googleMapsUrl && (
                            <span className="text-sm text-gray-500">
                                View on Google Maps →
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}