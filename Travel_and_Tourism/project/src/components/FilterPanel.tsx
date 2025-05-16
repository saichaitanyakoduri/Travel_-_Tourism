import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

type FilterValues = {
  price: number;
  departureTimes: string[];
  operator: string;
  facilities: string[];
  sortBy: string;
  rating: number;
};


interface FilterPanelProps {
  type: 'flight' | 'train' | 'bus' | 'hotel';
  onFilterChange: (filters: FilterValues) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ type, onFilterChange }) => {
  const [filters, setFilters] = useState<FilterValues>({
    price: 0,
    departureTimes: [],
    operator: '',
    facilities: [],
    sortBy: 'price_low',
    rating: 0,
  });

  const handleFilterChange = (key: keyof FilterValues, value: any) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterValues = {
      price: 0,
      departureTimes: [],
      operator: '',
      facilities: [],
      sortBy: 'price_low',
      rating: 0,
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const maxPrice = type === 'hotel' ? 5000 : 1000; // Dynamic price range

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <div className="flex items-center space-x-2 border-b pb-2">
        <SlidersHorizontal className="h-5 w-5 text-gray-500" />
        <h3 className="font-semibold text-gray-700">Filters</h3>
      </div>

      <div className="space-y-4">
        {/* Price Range */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Price Range</h4>
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={filters.price}
            className="w-full"
            onChange={(e) => handleFilterChange('price', parseInt(e.target.value))}
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹0</span>
            <span>₹{maxPrice}</span>
          </div>
        </div>

        {/* Departure Time (For transport types) */}
        {(type === 'flight' || type === 'train' || type === 'bus') && (
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Departure Time</h4>
            <div className="space-y-2">
              {['Morning', 'Afternoon', 'Evening', 'Night'].map((time) => (
                <label key={time} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.departureTimes.includes(time)}
                    className="rounded text-blue-600"
                    onChange={(e) => {
                      const updatedTimes = e.target.checked
                        ? [...filters.departureTimes, time]
                        : filters.departureTimes.filter((t) => t !== time);
                      handleFilterChange('departureTimes', updatedTimes);
                    }}
                  />
                  <span>{time}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Operator (For transport types) */}
        {(type === 'flight' || type === 'train' || type === 'bus') && (
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Operator</h4>
            <select
              className="w-full p-2 border rounded-md"
              value={filters.operator}
              onChange={(e) => handleFilterChange('operator', e.target.value)}
            >
              <option value="">All Operators</option>
              <option value="Operator A">Operator A</option>
              <option value="Operator B">Operator B</option>
              <option value="Operator C">Operator C</option>
            </select>
          </div>
        )}

        {/* Facilities (For buses and hotels) */}
        {(type === 'bus' || type === 'hotel') && (
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Facilities</h4>
            <div className="space-y-2">
              {['WiFi', 'AC', 'Food', 'Entertainment'].map((facility) => (
                <label key={facility} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.facilities.includes(facility)}
                    className="rounded text-blue-600"
                    onChange={(e) => {
                      const updatedFacilities = e.target.checked
                        ? [...filters.facilities, facility]
                        : filters.facilities.filter((f) => f !== facility);
                      handleFilterChange('facilities', updatedFacilities);
                    }}
                  />
                  <span>{facility}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Rating Filter (For hotels) */}
        {type === 'hotel' && (
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Rating</h4>
            <select
              className="w-full p-2 border rounded-md"
              value={filters.rating}
              onChange={(e) => handleFilterChange('rating', parseInt(e.target.value))}
            >
              <option value="0">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars & Above</option>
              <option value="3">3 Stars & Above</option>
            </select>
          </div>
        )}

        {/* Sort By */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Sort By</h4>
          <select
            className="w-full p-2 border rounded-md"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          >
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            {type === 'hotel' && <option value="rating">Rating</option>}
            {type !== 'hotel' && <option value="duration">Duration</option>}
          </select>
        </div>

        {/* Reset Filters */}
        <div className="text-right">
          <button
            className="text-blue-600 underline"
            onClick={resetFilters}
            type="button"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
