import React from 'react';
import Container from './container';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-8 text-sm">
    <Container>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
       
        <div>
          <h2 className="font-semibold text-lg">FYNAMICS Business Solutions(P) Ltd</h2>
          <p className="text-gray-400 mt-2">
            Finline is an automated platform for financial documents. Your risk-free online tool to create a project
            report to apply for a bank loan. Be it a new business portfolio or an existing CMA for SME, we have
            solutions for entrepreneurs & enterprises at every stage.
          </p>
        </div>

        
        <div className="flex flex-col">
          <a href="#" className="text-white hover:underline">Affiliates</a>
          <a href="#" className="text-white hover:underline mt-2">Professionals</a>
        </div>

        
        <div className="text-gray-400 flex flex-col items-start md:items-end">
          <p>&copy; Copyright 2019 - 2020 Finline</p>
        </div>
      </div>
      </Container>
    </footer>
    // </div>
  );
};

export default Footer;
