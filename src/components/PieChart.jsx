// J.M.J.
// This Pie chart is based on this tutorial here:
// https://youtu.be/XEUCs7Sh8FI?si=iA3wvEV-AaBqkjLV
import RatingBadge from './RatingBadge.jsx'

/*
  videoRatingCounts is an object containing the number of videos for each OSV rating:

  Keys:
    A-I
    A-II
    A-III
    L
    O
*/
function PieChart({ videoRatingCounts }) {

  // const numVideos = Object.values().reduce((sum, value) => sum + value, 0);
  let numVideos = 0;
  for (const [key, value] of Object.entries(videoRatingCounts)) {
    if (key !== 'unrated') {
      numVideos += value;
    }
  }

  if (numVideos === 0) {
    return (
      <h1>Error: No videos provided!</h1>
    )
  }

  // Rating proportions
  const AI = videoRatingCounts['A-I'] / numVideos
  const AII = videoRatingCounts['A-II'] / numVideos
  const AIII = videoRatingCounts['A-III'] / numVideos
  const L = videoRatingCounts['L'] / numVideos
  const O = videoRatingCounts['O'] / numVideos
  
  const PI = 3.14159265;
  const canvasSize = "200" // pixels
  const viewBoxSize = "100" // unitless
  const radius = viewBoxSize/4;

  return (
    <svg
      height={canvasSize}
      width={canvasSize}
      // viewBox:
      viewBox={
        "0 " +  
        "0 " + 
        viewBoxSize + " " +
        viewBoxSize} 
    >
      <circle
        r="25"
        cx="50"
        cy="50"
        fill="none"
        stroke="rgb(0, 166, 62)"
        strokeWidth="50"
        strokeDasharray={
          String(AI * 2*PI*radius) 
          + " " + 
          String(2*PI*radius)
        }
        transformOrigin="center"
        transform="rotate(180)"
      />

      <circle
        r="25"
        cx="50"
        cy="50"
        fill="none"
        stroke="rgb(21, 93, 252)"
        strokeWidth="50"
        /*
          A list of comma and/ or whitespace seperated lengths and percentages
        */
        strokeDasharray={
          String(AII * 2*PI*radius) 
          + " " + 
          String(2*PI*radius)
        }
        transformOrigin="center"
        transform={"rotate(" + String(180 + AI*360) + ")"}
      />
      <circle 
        r="25"
        cx="50"
        cy="50"
        fill="none"
        stroke="rgb(255, 105, 0)"
        strokeWidth="50"
        /*
          A list of comma and/ or whitespace seperated lengths and percentages
        */
        strokeDasharray={
          String(AIII * 2*PI*radius) 
          + " " + 
          String(2*PI*radius)
        }
        transformOrigin="center"
        transform={"rotate(" + String(180 + (AI + AII)*360) + ")"}
      />
      <circle
        r="25"
        cx="50"
        cy="50"
        fill="none"
        stroke="rgb(231, 0, 11)"
        strokeWidth="50"
        /*
          A list of comma and/ or whitespace seperated lengths and percentages
        */
        strokeDasharray={
          String(L * 2*PI*radius) 
          + " " + 
          String(2*PI*radius)
        }
        transformOrigin="center"
        transform={"rotate(" + String(180 + (AI + AII + AIII)*360) + ")"}
      />
      <circle
        r="25"
        cx="50"
        cy="50"
        fill="none"
        stroke="black"
        strokeWidth="50"
        /*
          A list of comma and/ or whitespace seperated lengths and percentages
        */
        strokeDasharray={
          String(O * 2*PI*radius) 
          + " " + 
          String(2*PI*radius)
        }
        transformOrigin="center"
        transform={"rotate(" + String(180 + (AI + AII + AIII + L)*360) + ")"}
      />
    </svg>
  )
}

export default PieChart;