import './index.css'

const SimilarProductItem = props => {
  const {product} = props
  const updatedSimilarProduct = {
    id: product.id,
    imageUrl: product.image_url,
    title: product.title,
    price: product.price,
    description: product.description,
    availability: product.availability,
    rating: product.rating,
    brand: product.brand,
    totalReviews: product.total_reviews,
    style: product.style,
  }
  const {imageUrl, title, price, rating, brand} = updatedSimilarProduct

  return (
    <li className="product-item">
      <img src={imageUrl} alt="similar product" className="thumbnail" />
      <h1 className="title">{title}</h1>
      <p className="brand">by {brand}</p>
      <div className="product-details">
        <p className="price">Rs {price}/-</p>
        <div className="new-rating-container">
          <p className="rating">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png "
            alt="star"
            className="star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
