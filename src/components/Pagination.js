import React from 'react';

//TODO:: handle disabled buttons
function Pagination({ nextPage, previousPage }) {
    return (
        <div className="pagination">
            <button onClick={() => previousPage()} disabled={false}>
                {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={false}>
                {'>'}
            </button>{' '}
        </div>
    );
}

export default Pagination;
