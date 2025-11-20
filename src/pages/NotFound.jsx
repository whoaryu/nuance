import { useNavigate } from 'react-router-dom'
import StateMessage from '../components/StateMessage'

// simple 404 illustration
function CompassIllustration() {
  return (
    <div className="rounded-full bg-stone-50 p-6 text-stone-300">
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="38" stroke="currentColor" strokeWidth="2" />
        <path
          d="M60 30v6M60 84v6M30 60h6M84 60h6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M48 48l30-12-12 30-30 12 12-30Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="60" cy="60" r="4" fill="currentColor" />
      </svg>
    </div>
  )
}

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <StateMessage
      title="404 — Page not found"
      message="The route you requested does not exist. Try heading back to the catalog."
      actionLabel="Go home"
      onAction={() => navigate('/')}
      illustration={<CompassIllustration />}
    />
  )
}

