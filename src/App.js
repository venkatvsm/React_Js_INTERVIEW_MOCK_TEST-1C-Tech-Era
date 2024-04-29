import './App.css'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import CoursesDetailsView from './components/CoursesDetailsView'
import NotFound from './components/NotFound'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CoursesDetailsView} />
    <Route component={NotFound} />
  </Switch>
)

export default App
