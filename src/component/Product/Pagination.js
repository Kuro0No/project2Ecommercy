import { Link,   } from 'react-router-dom'
import { memo } from 'react';
import './Products.scss'


const Pagination = ({ productsPerPage, totalProductsLength, paginate, handlePre, handleNext, currentPage }) => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalProductsLength / productsPerPage); i++) {
        pageNumbers.push(i)
        
    }
    
  


    return <div className='d-flex justify-content-center'>
        <nav aria-label="...">
            <ul className="pagination">
                <li className='page-item '>
                    <Link className='page-link' onClick={handlePre} to='' >Previous</Link>
                </li>
                {pageNumbers.map((number, index) => {
                    const currentPageNumber = index + 1
                    
                    return (
                        <li key={number} className='page-item' >
                            <Link to='' onClick={() => { paginate(number)}} className={`page-link ${currentPage === currentPageNumber ? 'active' :''}`} >{number}</Link>
                        </li>

                    )
                })}
                <li className="page-item">
                    <Link className="page-link" onClick={handleNext} to=''>Next</Link>
                </li>

            </ul>

        </nav>
    </div>;
};

export default memo(Pagination);
