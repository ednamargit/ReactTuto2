// import React, { Component } from "react";
import React from "react"; 
import PropTypes from 'prop-types';
import _ from "lodash"; //we use _ because this is an optimized version of a js library called underscore

//Stateless Functional Component
const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  console.log(currentPage);

  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) return null;

  const pages = _.range(1, pagesCount + 1); //We need to add 1 because this method will not include this end number itself

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li key={page} className={ page === currentPage ? 'page-item active' : 'page-item'}>
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired, 
  pageSize: PropTypes.number.isRequired, 
  currentPage: PropTypes.number.isRequired, 
  onPageChange: PropTypes.func.isRequired
}; 

export default Pagination;
