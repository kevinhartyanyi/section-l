'use client';

import { Neighborhood, CityGem } from "@/lib/types";
import { createFetchFunction, proxyFetch } from "@/lib/utils";
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

// If we have more city gems (currently there's only 25 in the api) then we could switch to batching to avoid too long url for the query
const fetchCityGemsByIds = async (ids: number[]): Promise<CityGem[]> => {
  if (ids.length === 0) return [];

  // Build Strapi filter: filters[id][$in][0]=625&filters[id][$in][1]=626...
  const filterParams = ids.map((id, index) => `filters[id][$in][${index}]=${id}`).join('&');
  const response = await proxyFetch(`api/city-gems?${filterParams}&populate=*`);

  console.log(response)

  if (!response.ok) {
    throw new Error('Failed to fetch city gems');
  }

  const data = await response.json();
  console.log("data", data)
  return data.data || [];
};

export default function GemListPage({ params }: Props) {
  const { id } = use(params);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const {
    data: allNeighborhoods = [],
    isLoading: neighborhoodsLoading,
    error: neighborhoodsError
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

  // Extract IDs for detailed fetch
  const gemIds = uniqueCityGems.map(gem => gem.id);

  // Fetch full city gem details with populate
  const {
    data: detailedCityGems = [],
    isLoading: gemsLoading,
    error: gemsError
  } = useQuery({
    queryKey: ['city-gems', gemIds],
    queryFn: () => fetchCityGemsByIds(gemIds),
    enabled: gemIds.length > 0, // Only fetch if we have IDs
  });

  // Use detailed gems if available, fallback to basic ones
  const cityGemsToUse = detailedCityGems.length > 0 ? detailedCityGems : uniqueCityGems;

  // Group city gems by category and count them
  const categoryStats = cityGemsToUse.reduce((acc, gem) => {
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
    ? cityGemsToUse.filter(gem => (gem.category || 'Uncategorized') === selectedCategory)
    : [];

  const loading = neighborhoodsLoading || gemsLoading;
  const error = neighborhoodsError || gemsError;

  if (error) {
    return (
      <div className="min-h-screen p-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-red-500">Error loading data: {error.message}</p>
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