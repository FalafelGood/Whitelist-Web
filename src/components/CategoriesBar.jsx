import { Link } from 'react-router-dom'
import { formatCategoryText } from '../pages/CategoriesPage'

function CategoriesBar({ category }) {
  return (
    <div className="navbar bg-base-200 shadow-sm flex flex-col space-between w-full">
      <div className="flex flex-row items-center">
        <h1 className="mr-2">Browsing channels by:</h1>
        <Link to="/categories" className="btn m-1">
          {formatCategoryText(category)}
        </Link>
      </div>
    </div>
  )
}

export default CategoriesBar
