import React, { useState, useEffect } from 'react';
import { getAllData } from '../services/api';
import Filter from './Filter';
import Visualization from './Visualization';

// CSS Styles
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    endYear: '', topic: '', sector: '', region: '', pestle: '', source: '', swot: '', country: '', city: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getAllData();
      setData(result);
      setFilteredData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    // Apply filters to the data
    let filtered = data;

    if (filters.endYear) {
      filtered = filtered.filter((item) => item.endYear === parseInt(filters.endYear));
    }

    if (filters.topic) {
      filtered = filtered.filter((item) => item.topic === filters.topic);
    }

    if (filters.sector) {
      filtered = filtered.filter((item) => item.sector === filters.sector);
    }

    if (filters.region) {
      filtered = filtered.filter((item) => item.region === filters.region);
    }

    if (filters.pestle) {
      filtered = filtered.filter((item) => item.pestle === filters.pestle);
    }

    if (filters.source) {
      filtered = filtered.filter((item) => item.source === filters.source);
    }

    if (filters.swot) {
      filtered = filtered.filter((item) => item.swot === filters.swot);
    }

    if (filters.country) {
      filtered = filtered.filter((item) => item.country === filters.country);
    }

    if (filters.city) {
      filtered = filtered.filter((item) => item.city === filters.city);
    }

    setFilteredData(filtered);
  }, [filters, data]);

  return (
    <div className="dashboard-container">
    <h1>Data Visualization Dashboard</h1>
    <div className="filter-bar">
      <Filter
        options={{ label: 'End Year', values: [2021, 2022, 2023] }}
        onChange={(e) => handleFilterChange('endYear', e.target.value)}
      />
      <Filter
        options={{ label: 'Topic', values: [...new Set(data.map((item) => item.topic))] }}
        onChange={(e) => handleFilterChange('topic', e.target.value)}
      />
      <Filter
        options={{ label: 'Sector', values: [...new Set(data.map((item) => item.sector))] }}
        onChange={(e) => handleFilterChange('sector', e.target.value)}
      />
      <Filter
        options={{ label: 'Region', values: [...new Set(data.map((item) => item.region))] }}
        onChange={(e) => handleFilterChange('region', e.target.value)}
      />
      <Filter
        options={{ label: 'PEST', values: [...new Set(data.map((item) => item.pestle))] }}
        onChange={(e) => handleFilterChange('pestle', e.target.value)}
      />
      <Filter
        options={{ label: 'Source', values: [...new Set(data.map((item) => item.source))] }}
        onChange={(e) => handleFilterChange('source', e.target.value)}
      />
      <Filter
        options={{ label: 'SWOT', values: [...new Set(data.map((item) => item.swot))] }}
        onChange={(e) => handleFilterChange('swot', e.target.value)}
      />
      <Filter
        options={{ label: 'Country', values: [...new Set(data.map((item) => item.country))] }}
        onChange={(e) => handleFilterChange('country', e.target.value)}
      />
      <Filter
        options={{ label: 'City', values: [...new Set(data.map((item) => item.city))] }}
        onChange={(e) => handleFilterChange('city', e.target.value)}
      />
      {/* Add more Filter components for any additional criteria */}
    </div>
    <div className="data-container">
      {filteredData.map((item) => (
        <div key={item._id} className="data-item">
          <p className="data-title">{item.title}</p>
          <p className="data-field">Sector: {item.sector}</p>
          <p className="data-field">Topic: {item.topic}</p>
          <p className="data-field">Insight: {item.insight}</p>
          <p className="data-field">End Year: {item.end_year}</p>
          <p className="data-field">Region: {item.region}</p>
          <p className="data-field">Country: {item.country}</p>
          {/* Add more fields here */}
        </div>
      ))}
    </div>
    <Visualization data={filteredData} />
  </div>
  

  );
};

export default Dashboard;
