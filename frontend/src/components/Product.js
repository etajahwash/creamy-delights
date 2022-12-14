import '../styling/Product.css'
import iceCreamBackground from '../imgs/image.png'
import { Link } from 'react-router-dom'
import { useGetAllProductsQuery } from '../features/productsApi'

export default function Product(product) {
    const {  error, isLoading } = useGetAllProductsQuery()
    return (
        <div className='productContainer'>
        {isLoading ? (<p>...Loading</p>) 
        : error ? (<p>An error occurred</p>) 
        : (<>
            <Link to={`/menu/${1111}`}>
            <div className='card' style={{
                    backgroundImage: `url(${iceCreamBackground})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 150%',
                    backgroundPosition: 'center center',
                    height: '13rem',
                    margin: '1rem',
                    backgroundColor: 'transparent',
                    borderStyle: 'none'
            }}>
            </div>
            </Link>
            <h3 className='productText'>{product.name}</h3>
        </>)}
        </div>
    )
}