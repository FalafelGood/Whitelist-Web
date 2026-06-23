import { Link } from 'react-router-dom'

export const CATEGORIES = [
  'religion',
  'math',
  'science',
  'literature',
  'history',
  'computer_science',
  'art',
  "chill",
  "podcast",
  "comedy",
  "gaming",
  "ecclectic"
]

export function formatCategoryText(str) {
  if (str.length === 0) {
    return '';
  }
  return (str.charAt(0).toUpperCase() + str.slice(1)).replace("_", " ");
}

function categoryPath(category) {
  return category === 'all' ? '/' : `/?category=${encodeURIComponent(category)}`
}

function CategoriesPage() {
  return (
    <div className="px-10">
      
      <h1 className="text-2xl font-semibold text-center my-6">Choose a category</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            to={categoryPath(cat)}
            className="card border border-width-1 border-neutral-300 hover:bg-base-300 transition-all"
          >
            <div className="card-body items-center text-center p-6">
              <h2 className="">{formatCategoryText(cat)}</h2>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-center">
        <Link to="/" className="btn btn-primary w-48 mt-8">
          Browse all channels
        </Link>
      </div>
    </div>
  )
}

export default CategoriesPage
