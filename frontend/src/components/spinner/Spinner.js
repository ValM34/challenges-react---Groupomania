import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function Spinner({size = ""}) {
  return (
    <div className="flex justify-center items-center">
      <FontAwesomeIcon className={`animate-spin text-blue-600 ${size}`} icon={faSpinner} />
    </div>
  );
}
