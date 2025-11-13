'use client';

import { Neighborhood } from "@/lib/types";
import { createFetchFunction } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useState, use } from "react";
import CategoryGems from "../../components/CategoryGems";
import CategoryList from "../../components/CategoryList";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const fetchNeighborhoods = createFetchFunction<Neighborhood>('api/neighborhoods?populate=properties&populate=city_gems');

export default function GemListPage({ params }: Props) {
  const { id } = use(params);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const {
    data: allNeighborhoods = [],
    isLoading: loading,
    error
  } = useQuery({
    queryKey: ['neighborhoods'],
    queryFn: fetchNeighborhoods,
  });

  // Filter neighborhoods that contain this property
  const neighborhoods = allNeighborhoods.filter((neighborhood: Neighborhood) =>
    neighborhood.properties?.some(property => property.id.toString() === id)
  );

  // Get all city gems from filtered neighborhoods and remove duplicates
  const allCityGems = neighborhoods.flatMap(n => n.city_gems || []);
  const uniqueCityGems = Array.from(
    new Map(allCityGems.map(gem => [gem.id, gem])).values()
  );

  // Group city gems by category and count them
  const categoryStats = uniqueCityGems.reduce((acc, gem) => {
    const category = gem.category || 'Uncategorized';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categories = Object.entries(categoryStats)
    .map(([name, count]) => ({
      name,
      count
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Get gems for selected category
  const selectedCategoryGems = selectedCategory
    ? uniqueCityGems.filter(gem => (gem.category || 'Uncategorized') === selectedCategory)
    : [];

  if (error) {
    return (
      <div className="min-h-screen p-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-red-500">Error loading neighborhoods: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {selectedCategory ? (
          <CategoryGems
            selectedCategory={selectedCategory}
            selectedCategoryGems={selectedCategoryGems}
            onBack={() => setSelectedCategory(null)}
          />
        ) : (
          <CategoryList
            categories={categories}
            loading={loading}
            onSelectCategory={setSelectedCategory}
          />
        )}
      </div>
    </div>
  );
}