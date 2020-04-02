import React from 'react';

function Pagination({ nextPage, previousPage, nextUrl, prevUrl }) {
    return (
        <div className="pagination">
            <button onClick={() => previousPage()} disabled={!prevUrl}>
                {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!nextUrl}>
                {'>'}
            </button>{' '}
        </div>
    );
}

export default Pagination;
