'use client';

import { Neighborhood, CityGem, CityGemMinimal } from "@/lib/types";
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

// Optimized neighborhoods fetch - only get IDs and basic gem info
const fetchNeighborhoods = createFetchFunction<Neighborhood>(
  'api/neighborhoods?' +
  'fields[0]=id&' +
  'populate[properties][fields][0]=id&' +
  'populate[city_gems][fields][0]=id&' +
  'populate[city_gems][fields][1]=name&' +
  'populate[city_gems][fields][2]=category'
);

// Optimized city gems fetch - only get fields displayed in UI
const fetchCityGemsByIds = async (ids: number[]): Promise<CityGem[]> => {
  if (ids.length === 0) return [];

  const filterParams = ids.map((id, index) => `filters[id][$in][${index}]=${id}`).join('&');

  const fields =
    'fields[0]=id&' +
    'fields[1]=name&' +
    'fields[2]=category&' +
    'fields[3]=shortDescription&' +
    'fields[4]=longDescription&' +
    'fields[5]=googleMapsUrl&' +
    'fields[6]=tip&' +
    'fields[7]=slug';

  const populate =
    'populate[coverImage][fields][0]=url&' +
    'populate[coverImage][fields][1]=alternativeText&' +
    'populate[coverImage][fields][2]=formats&' +
    'populate[tags][fields][0]=id&' +
    'populate[tags][fields][1]=name';

  const response = await proxyFetch(`api/city-gems?${filterParams}&${fields}&${populate}`);

  if (!response.ok) {
    throw new Error('Failed to fetch city gems');
  }

  const data = await response.json();
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

  // Fetch full city gem details with optimized fields
  const {
    data: detailedCityGems = [],
    isLoading: gemsLoading,
    error: gemsError
  } = useQuery({
    queryKey: ['city-gems', gemIds],
    queryFn: () => fetchCityGemsByIds(gemIds),
    enabled: gemIds.length > 0,
  });

  // Use detailed gems if available, fallback to basic ones
  const cityGemsToUse: (CityGem | CityGemMinimal)[] =
    detailedCityGems.length > 0 ? detailedCityGems : uniqueCityGems;

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
            selectedCategoryGems={selectedCategoryGems as CityGem[]}
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