import {Link} from 'react-router-dom'
import './index.css'

const CoursesList = props => {
  const {coursesList} = props
  const {id, logoUrl, name} = coursesList
  return (
    <Link to={`/courses/${id}`} className="link">
      <li className="ListItems">
        <img src={logoUrl} className="ListItems_image" alt={name} />
        <p className="ListItems_para">{name}</p>
      </li>
    </Link>
  )
}
export default CoursesList
