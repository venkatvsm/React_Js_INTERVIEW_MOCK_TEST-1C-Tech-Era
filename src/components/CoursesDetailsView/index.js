import {Component} from 'react'
import TailSpin from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

class CoursesDetailsView extends Component {
  state = {listDetails: [], apiStatus: ''}

  componentDidMount() {
    this.renderApiCalls()
  }

  renderApiCalls = async () => {
    this.setState({apiStatus: 'LOADING'})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updatedlist = {
        id: data.course_details.id,
        name: data.course_details.name,
        description: data.course_details.description,
        imageUrl: data.course_details.image_url,
      }
      this.setState({listDetails: updatedlist, apiStatus: 'SUCCESS'})
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
    const {listDetails} = this.state
    const {name, description, imageUrl} = listDetails
    return (
      <div className="card_container">
        <img src={imageUrl} alt={name} className="image" />
        <div>
          <h1 className="heading">{name}</h1>
          <p className="para">{description}</p>
        </div>
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
      <div className="detailsBgContainer">
        <Header />
        {this.renderComponents()}
      </div>
    )
  }
}
export default CoursesDetailsView
