import React from 'react';
import { CSVLink } from 'react-csv';

const CsvExportButton = ({ headers, data }) => {
  return (
    <CSVLink
      headers={headers}
      data={data}
      className='bg-green-700 text-white rounded p-2 hover:scale-95'
      filename={'pegatron-file.csv'}
    >
      Download CSV
    </CSVLink>
  );
};

export default CsvExportButton;
