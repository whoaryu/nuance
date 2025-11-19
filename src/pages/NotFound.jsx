import { useNavigate } from 'react-router-dom'
import StateMessage from '../components/StateMessage'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <StateMessage
      title="404 — Page not found"
      message="The route you requested does not exist. Try heading back to the catalog."
      actionLabel="Go home"
      onAction={() => navigate('/')}
    />
  )
}

