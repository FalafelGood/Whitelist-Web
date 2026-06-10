// J.M.J.

const RATING_BADGE_COLORS = {
  'A-I': 'bg-green-600',
  'A-II': 'bg-blue-600',
  'A-III': 'bg-orange-500',
  'L': 'bg-red-600',
  'O': 'bg-black',
}

const RATING_BADGE_TEXT = {
  'A-I': 'A-I : All audiences',
  'A-II': 'A-II : Adults and adolecents',
  'A-III': 'A-III: Adults',
  'L': 'L: Limited adult audience',
  'O': 'O: Morally offensive',
}

function RatingBadge({ osvRating }) {

  const badgeColor = RATING_BADGE_COLORS[osvRating] ?? 'badge-neutral';
  const badgeText = RATING_BADGE_TEXT[osvRating] ?? 'Unrated'

  return(
    <span className={`badge ${badgeColor} text-md text-white shrink-0`}>
      {badgeText}
    </span>
  );
}

export default RatingBadge;