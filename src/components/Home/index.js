import {Component} from 'react'
import TailSpin from 'react-loader-spinner'
import Header from '../Header'
import CoursesList from '../CoursesList'
import './index.css'

class Home extends Component {
  state = {coursesList: [], apiStatus: ''}

  componentDidMount() {
    this.renderApiCalls()
  }

  renderApiCalls = async () => {
    this.setState({apiStatus: 'LOADING'})
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.courses.map(eachItem => ({
        id: eachItem.id,
        logoUrl: eachItem.logo_url,
        name: eachItem.name,
      }))
      this.setState({coursesList: updatedData, apiStatus: 'SUCCESS'})
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  renderLoading = () => (
    <div data-testid="loader" className="TailSpin">
      <TailSpin
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )

  renderSuccessView = () => {
    const {coursesList} = this.state
    return (
      <div className="Home_cardContainer">
        <h1 className="Home_Heading">Courses</h1>
        <ul className="UlListContainer">
          {coursesList.map(eachItem => (
            <CoursesList coursesList={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure_image"
      />
      <h1 className="failure_Heading">Oops! Something Went Wrong</h1>
      <p className="failure_para">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="failure_Btn" type="button" onClick={this.renderApiCalls}>
        Retry
      </button>
    </div>
  )

  renderComponents = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'LOADING':
        return this.renderLoading()
      case 'SUCCESS':
        return this.renderSuccessView()
      default:
        return this.renderFailureView()
    }
  }

  render() {
    return (
      <div className="HomeContainer">
        <Header />
        {this.renderComponents()}
      </div>
    )
  }
}
export default Home
