'use client';

import { CityGem } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

interface CategoryGemsProps {
    selectedCategory: string;
    selectedCategoryGems: CityGem[];
    onBack: () => void;
}

type SortOption = 'name' | 'none';

export default function CategoryGems({ selectedCategory, selectedCategoryGems, onBack }: CategoryGemsProps) {
    const router = useRouter();
    const [sortBy, setSortBy] = useState<SortOption>('none');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Get all unique tags from gems
    const allTags = Array.from(
        new Set(
            selectedCategoryGems
                .flatMap(gem => gem.tags || [])
                .map(tag => tag.name)
        )
    ).sort();

    // Filter gems by selected tags
    const filteredGems = selectedTags.length > 0
        ? selectedCategoryGems.filter(gem =>
            gem.tags?.some(tag => selectedTags.includes(tag.name))
        )
        : selectedCategoryGems;

    // Sort gems
    const sortedGems = [...filteredGems].sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        }
        return 0;
    });

    const toggleTag = (tagName: string) => {
        setSelectedTags(prev =>
            prev.includes(tagName)
                ? prev.filter(t => t !== tagName)
                : [...prev, tagName]
        );
    };

    return (
        <>
            <button
                onClick={onBack}
                className="mb-4 text-gray-600 hover:text-gray-800 transition-colors"
            >
                ← Back to categories
            </button>

            <h1 className="text-3xl font-light mb-2 text-gray-800">{selectedCategory}</h1>
            <p className="text-gray-500 mb-6">
                {sortedGems.length} {sortedGems.length === 1 ? 'place' : 'places'}
            </p>

            {/* Filters and Sort */}
            <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex flex-wrap gap-4 items-center">
                    {/* Sort */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">Sort:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
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
                                    onClick={() => toggleTag(tag)}
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
                    {selectedTags.length > 0 && (
                        <button
                            onClick={() => setSelectedTags([])}
                            className="text-sm text-gray-500 hover:text-gray-700 underline"
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            </div>

            {/* Gems List */}
            <div className="space-y-6">
                {sortedGems.map((gem) => (
                    <div
                        key={gem.id}
                        onClick={() => router.push(`/gems/${gem.slug}`)}
                        className="border border-gray-300 hover:border-gray-500 transition-colors cursor-pointer overflow-hidden"
                    >
                        {/* Cover Image */}
                        {gem.coverImage && (
                            <div className="relative w-full h-64 bg-gray-100">
                                <Image
                                    src={gem.coverImage.formats?.large?.url || gem.coverImage.url}
                                    alt={gem.coverImage.alternativeText || gem.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-6">
                            <h3 className="text-xl font-light text-gray-800 mb-2">
                                {gem.name}
                            </h3>

                            <p className="text-gray-600 mb-3">
                                {gem.shortDescription}
                            </p>

                            {gem.longDescription && (
                                <p className="text-sm text-gray-500 mb-4">
                                    {gem.longDescription}
                                </p>
                            )}

                            {/* Tags */}
                            {gem.tags && gem.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {gem.tags.map(tag => (
                                        <span
                                            key={tag.id}
                                            className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Tip */}
                            {gem.tip && (
                                <div className="bg-gray-50 border-l-2 border-gray-300 p-3 mb-3">
                                    <p className="text-sm text-gray-700">
                                        💡 <span className="font-medium">Tip:</span> {gem.tip}
                                    </p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-4 text-sm">
                                {gem.googleMapsUrl && (
                                    <a
                                        href={gem.googleMapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
                                    >
                                        📍 View on Maps →
                                    </a>
                                )}
                                <span className="text-gray-400">
                                    View details →
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {sortedGems.length === 0 && (
                <p className="text-center text-gray-500 py-12">
                    No places found with the selected filters.
                </p>
            )}
        </>
    );
}