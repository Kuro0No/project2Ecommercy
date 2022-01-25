import { Link, useParams } from 'react-router-dom'


const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i)
    }
    const resParam = useParams()
    console.log(resParam)


    return <div>
        <nav aria-label="...">
            <ul className="pagination">
                
                {pageNumbers.map(number => (
                    <li key={number} className="page-item"><Link to='' onClick={() => paginate(number)} className="page-link">{number}</Link></li>
                ))}
                
            </ul>

        </nav>
    </div>;
};

export default Pagination;
