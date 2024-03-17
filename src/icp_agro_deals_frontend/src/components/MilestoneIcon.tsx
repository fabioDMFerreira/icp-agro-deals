import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TripOriginIcon from '@mui/icons-material/TripOrigin';


type MilestoneIconProperties = {
  description: string,
  location: string,
  date: string,
  isDone: boolean
}

const MilestoneIcon = ({description, location, date, isDone}: MilestoneIconProperties) => {
  return (
    <div className="min-w-20 flex flex-col items-center">
      {isDone ? <CheckCircleIcon className="text-lime-600" style={{ fontSize: 30 }} /> :
      <TripOriginIcon className="text-slate-400" style={{ fontSize: 30 }} />}
      <p className="text-[15px]">{description}</p>
      <p className="text-[15px]">{location}</p>
      <p className="text-[15px]">{date}</p>
    </div>
  )
}

export default MilestoneIcon