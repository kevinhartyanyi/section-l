'use client';

import { NeighborhoodCore, CityGem } from "@/lib/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Gems() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.id as string;
  const [neighborhoods, setNeighborhoods] = useState<NeighborhoodCore[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchNeighborhoodsForProperty();
  }, [propertyId]);

  const fetchNeighborhoodsForProperty = async () => {
    try {
      const response = await fetch('/api/neighborhoods');
      const data = await response.json();
      
      // Filter neighborhoods that contain this property
      const filteredNeighborhoods = (data.data || []).filter((neighborhood: NeighborhoodCore) => 
        neighborhood.properties?.some(property => property.id.toString() === propertyId)
      );
      
      console.log("Neighborhoods for property:", filteredNeighborhoods);
      setNeighborhoods(filteredNeighborhoods);
    } catch (error) {
      console.error("Error fetching neighborhoods:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get all city gems from all neighborhoods and remove duplicates by ID
  const allCityGems = neighborhoods.flatMap(n => n.city_gems || []);
  const uniqueCityGems = Array.from(
    new Map(allCityGems.map(gem => [gem.id, gem])).values()
  );

  // Group city gems by category and count them
  const categoryStats = uniqueCityGems.reduce((acc, gem) => {
    const category = gem.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category]++;
    return acc;
  }, {} as Record<string, number>);

  const categories = Object.entries(categoryStats).map(([name, count]) => ({
    name,
    count
  }));

  // Get gems for selected category
  const selectedCategoryGems = selectedCategory
    ? uniqueCityGems.filter(gem => (gem.category || 'Uncategorized') === selectedCategory)
    : [];

  return (
    <div className="min-h-screen p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {selectedCategory ? (
          <>
            <button
              onClick={() => setSelectedCategory(null)}
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
        ) : (
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
                        onClick={() => setSelectedCategory(category.name)}
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
        )}
      </div>
    </div>
  );
}