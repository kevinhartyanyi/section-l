'use client';

import { Property } from "@/lib/types";
import { proxyFetch } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";



export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await proxyFetch('api/properties?sort[0]=name:asc&fields[0]=id&fields[1]=name&fields[2]=acronym');
      const data = await response.json();
      console.log("data", data)
      setProperties(data.data || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter((property) =>
    property.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-light mb-8 text-gray-800">Properties</h1>

        <input
          type="text"
          placeholder="Search properties..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-black px-4 py-3 mb-8 border border-gray-300 rounded-none focus:outline-none focus:border-gray-500 transition-colors"
        />

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="space-y-4">
            {filteredProperties.map((property) => (
              <Link
                key={property.id}
                href={`/${property.id}`}
                className="block p-4 border border-gray-300 cursor-pointer hover:border-gray-500 transition-colors"
              >
                <h2 className="text-xl font-light text-gray-800">{property.name}</h2>
                {property.acronym && (
                  <p className="text-sm text-gray-500 mt-1">{property.acronym}</p>
                )}
              </Link>
            ))}
            {filteredProperties.length === 0 && (
              <p className="text-gray-500">No properties found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
