'use client';

import { CityGem } from "@/lib/types";
import { useState } from "react";
import GemCard from "./GemCard";
import FilterBar from "./FilterBar";

interface CategoryGemsProps {
    selectedCategory: string;
    selectedCategoryGems: CityGem[];
    onBack: () => void;
}

type SortOption = 'name' | 'none';

export default function CategoryGems({ selectedCategory, selectedCategoryGems, onBack }: CategoryGemsProps) {
    const [sortBy, setSortBy] = useState<SortOption>('none');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Get all unique tags from gems
    const allTags = Array.from(
        new Set(
            selectedCategoryGems
                .flatMap(gem => gem.tags || [])
                .map(tag => tag.name)
        )
    ).sort();

    // Filter gems by search term (search on shortDescription and longDescription)
    const searchFilteredGems = searchTerm
        ? selectedCategoryGems.filter(gem => {
            const searchLower = searchTerm.toLowerCase();
            const shortDesc = gem.shortDescription?.toLowerCase() || '';
            const longDesc = gem.longDescription?.toLowerCase() || '';
            return shortDesc.includes(searchLower) || longDesc.includes(searchLower);
        })
        : selectedCategoryGems;

    // Filter gems by selected tags
    const filteredGems = selectedTags.length > 0
        ? searchFilteredGems.filter(gem =>
            gem.tags?.some(tag => selectedTags.includes(tag.name))
        )
        : searchFilteredGems;

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

    const handleSortChange = (value: string) => {
        setSortBy(value as SortOption);
    };

    const clearAllFilters = () => {
        setSelectedTags([]);
        setSearchTerm('');
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

            <FilterBar
                sortBy={sortBy}
                onSortChange={handleSortChange}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                allTags={allTags}
                selectedTags={selectedTags}
                onToggleTag={toggleTag}
                onClearFilters={clearAllFilters}
            />

            {/* Gems List */}
            <div className="space-y-6">
                {sortedGems.map((gem) => (
                    <GemCard key={gem.id} gem={gem} />
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