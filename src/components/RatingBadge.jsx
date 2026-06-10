// J.M.J.

const BADGE_COLORS = {
  'A-I': 'bg-green-600',
  'A-II': 'bg-blue-600',
  'A-III': 'bg-orange-500',
  'L': 'bg-red-600',
  'O': 'bg-black',
}

const REGULAR_TEXT = {
  'A-I': 'A-I : All audiences',
  'A-II': 'A-II : Adults and adolecents',
  'A-III': 'A-III: Adults',
  'L': 'L: Limited adult audiences',
  'O': 'O: Morally offensive',
}

const SHORT_TEXT = {
  'A-I': 'A-I',
  'A-II': 'A-II',
  'A-III': 'A-III',
  'L': 'L',
  'O': 'O',
}

function RatingBadge({ osvRating, shortForm=false }) {

  const badgeColor = BADGE_COLORS[osvRating] ?? 'badge-neutral';
  const badgeText = 
    shortForm ? 
      SHORT_TEXT[osvRating] ?? 'Unrated' :
      REGULAR_TEXT[osvRating] ?? 'Unrated'; 


  return(
    <span className={`badge ${badgeColor} text-md text-white shrink-0`}>
      {badgeText}
    </span>
  );
}

export default RatingBadge;