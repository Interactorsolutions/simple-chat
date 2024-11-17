import React, { useState } from 'react';
import Header from '../components/Header';
import '../assets/style/custom.css';
import installServiceConnector from '../components/interactor_engine/ConnectorAuthUser'; // Avoid name conflict
import { connectors } from '../components/interactor_engine/GetConnectorList';

const IntegrationPage = () => {
  const [currentCategory, setCurrentCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [installingService, setInstallingService] = useState(null);

  const connectorName = connectors.map(item => ({
    id: item.id,
    name: item.name,
    icon: item.icon,
    categories: item.categories,
  }));

  const uniqueCategories = [...new Set(connectors.flatMap(item => item.categories))].sort();

  const filteredOptions = connectorName.filter(connector =>
    currentCategory === 'All' || connector.categories.includes(currentCategory)
  );

  const totalPages = Math.ceil(filteredOptions.length / itemsPerPage);
  const paginatedOptions = filteredOptions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleInstall = async (service) => {
    // Prevent duplicate calls by disabling the button during installation
    if (installingService === service) return;
    setInstallingService(service);

    try {
      const result = await installServiceConnector(service); // Use imported function
      console.log(`Connector ${service} installed:`, result);
    } catch (error) {
      console.error(`Error installing ${service} connector:`, error);
    } finally {
      setInstallingService(null); // Reset the state after installation
    }
  };

  return (
    <div className="main">
      <Header />
      <div className="integration-page">
        <aside className="integration-sidebar">
          <h3>Categories</h3>
          <ul>
            <li onClick={() => handleCategoryClick('All')}>All apps</li>
            {uniqueCategories.map((category) => (
              <li key={category} onClick={() => handleCategoryClick(category)}>
                {category}
              </li>
            ))}
          </ul>
        </aside>

        <main className="integration-main-content">
          <h2>{currentCategory}</h2>
          {paginatedOptions.map((connector) => (
            <div key={connector.id} className="integration-card">
              <div className="integration-card-content">
                <img src={connector.icon} alt={connector.name}></img>
                <h3>{connector.name}</h3>
                <p>{`Boost your work efficiency by integrating ${connector.name} with Swit`}</p>
                <div className="integration-tags">
                  {connector.categories.map((category, index) => (
                    <span key={index} className="integration-tag">{category}</span>
                  ))}
                </div>
              </div>
              <button
                className={
                  installingService === connector.name ? 'integration-button install' : 'integration-button uninstall'
                }
                type="button"
                disabled={installingService === connector.name} // Disable button during installation
                onClick={() => handleInstall(connector.name)}
              >
                {installingService === connector.name ? 'Uninstall' : 'Install'}
              </button>
            </div>
          ))}

          <div className="integration-pagination">
            {[...Array(totalPages).keys()].map((_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? 'active' : ''}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default IntegrationPage;