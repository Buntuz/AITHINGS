import React, { useState } from 'react';
import data from './jsondata.json';

// Define the type of each item in the JSON data
type DataItem = {
  id: number;
  name: string;
};

const SearchBarFilter = () => {
  // State to manage the search term
  const [searchTerm, setSearchTerm] = useState('');

  // State to store the filtered data
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);

  // Function to filter data based on search term
  const filterData = (searchTerm: string) => {
    //const filteredData = data.filter((item: DataItem) =>
     // item.name.toLowerCase().includes(searchTerm.toLowerCase())
   // );
    setFilteredData(filteredData);
  };

  // Handle input change event
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    filterData(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />

      <ul>
        {filteredData.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBarFilter;
