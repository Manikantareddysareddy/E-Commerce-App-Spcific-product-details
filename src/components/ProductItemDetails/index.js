import {Component} from 'react'

import Cookies from 'js-cookie'

import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'

import {Redirect, Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    ProductData: {},
    count: 1,
    SimilarProducts: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProductData()
  }

  getProductData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    const data = await response.json()
    console.log(response.status)
    if (response.ok === true) {
      const updatedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        description: data.description,
        availability: data.availability,
        rating: data.rating,
        brand: data.brand,
        totalReviews: data.total_reviews,
        similarProducts: data.similar_products,
      }
      this.setState({
        ProductData: updatedData,
        SimilarProducts: updatedData.similarProducts,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      console.log('failure')
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  redirectToShopping = () => <Redirect to="/products" />

  onDecrement = () => {
    const {count} = this.state
    if (count !== 1) {
      this.setState({count: count - 1})
    }
  }

  onIncrement = () => {
    const {count} = this.state
    this.setState({count: count + 1})
  }

  renderProductFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">Product Not Found</h1>
      <Link to="/products" className="continue-shopping-btn1">
        <button className="continue-shopping-btn" type="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  renderProductLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderProductDetailsView = () => {
    const {ProductData, count, SimilarProducts} = this.state
    const {
      imageUrl,
      title,
      price,
      description,
      availability,
      rating,
      brand,
      totalReviews,
    } = ProductData
    console.log('bali')

    return (
      <div>
        <div className="product-container">
          <img src={imageUrl} alt="product" className="product-image" />
          <div>
            <h1 className="product-heading">{title}</h1>
            <p className="product-price">Rs {price}/- </p>
            <div className="rating-reviews-container ">
              <div className="rating-container">
                <p className="rating-para">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star-image"
                />
              </div>
              <p className="reviews-heading">{totalReviews} Reviews</p>
            </div>
            <p className="description-para">{description}</p>
            <div className="available-para">
              <p className="Available-para">Available :</p>
              <p className="spanEl">{availability}</p>
            </div>
            <div className="available-para">
              <p className="Available-para">Brand :</p>
              <p className="spanEl">{brand}</p>
            </div>

            <hr className="horizon-line" />
            <div className="increment-container">
              <button
                data-testid="minus"
                onClick={this.onDecrement}
                className="btn-style"
                type="button"
              >
                <BsDashSquare />.
              </button>

              <p className="count-para">{count}</p>
              <button
                data-testid="plus"
                onClick={this.onIncrement}
                className="btn-style"
                type="button"
              >
                <BsPlusSquare />.
              </button>
            </div>
            <button type="button" className="AddCart-btn">
              ADD TO CART
            </button>
          </div>
        </div>
        <h1 className="similar-products">Similar Products</h1>
        <ul className="ul-container">
          {SimilarProducts.map(eachProduct => (
            <SimilarProductItem product={eachProduct} key={eachProduct.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderAllProducts = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderProductFailureView()
      case apiStatusConstants.inProgress:
        return this.renderProductLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderAllProducts()}
      </div>
    )
  }
}

export default ProductItemDetails
