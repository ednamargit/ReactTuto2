import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

// Destructuring Arguments (cleaner code) 
const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
      <TableBody columns={columns} data={data} />
    </table>
  );
};


// Destructuring Arguments 
// const Table = (props) => {
//   const { columns, sortColumn, onSort, data } = props; 
//   return (
//     <table className="table">
//       <TableHeader
//         columns={columns}
//         sortColumn={sortColumn}
//         onSort={onSort}
//       />
//       <TableBody columns={columns} data={data} />
//     </table>
//   );
// };

export default Table;