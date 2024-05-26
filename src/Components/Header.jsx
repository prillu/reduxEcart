import { Nav,Navbar,Container,Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchProduct } from '../Redux/productSlice'


const Header = ({insideHome}) => {
  const dispatch = useDispatch()
  const yourWishlist = useSelector(state=>state.wishlistReducer)
  const yourCart = useSelector(state=>state.cartReducer)
  return (
    <Navbar expand="lg" className="bg-info w-100 position-fixed top-0" style={{zIndex:'10'}}>
      <Container>
        <Navbar.Brand><Link className='fw-bolder' to={'/'} style={{color:'white',textDecoration:'none'}} ><i class="fa-solid fa-truck-fast"></i>FF store </Link> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
           {insideHome && <Nav.Link>
              <input onChange={e=>dispatch(searchProduct(e.target.value.toLowerCase()))} style={{width:'500px'}} type="text" className="rounded p-1" placeholder='Search Products Here!!!'/>
            </Nav.Link>}

            <Nav.Link>
              <Link className='fw-bolder' to={'/wishlist'} style={{color:'white',textDecoration:'none'}} ><i class="fa-solid fa-heart text-danger"></i>&nbsp;wishlist &nbsp;<Badge>{yourWishlist?.length}</Badge> 
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className='fw-bolder' to={'/cart'} style={{color:'white',textDecoration:'none'}} ><i class="fa-solid fa-cart-plus text-success"></i>&nbsp;cart &nbsp;<Badge>{yourCart?.length}</Badge> 
              </Link>
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
