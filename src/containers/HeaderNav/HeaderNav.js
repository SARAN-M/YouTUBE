import React  from 'react';
import {Form, Icon, Image, Input, Menu} from 'semantic-ui-react';
import './HeaderNav.scss';
import logo from '../../assets/images/logo.jpg';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import Suggestions from '../HeaderNav/suggestion';
 
//const API_URL='https://content.googleapis.com/youtube/v3';
//const API_KEY='AIzaSyDulkw9f_AxBu0iOSTPUzxlhbK-1BBIOBQ';
 
export class HeaderNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results:'',
    };
  }
 
  render() {
    return (
      // 1
      <Menu borderless className='top-menu' fixed='top'>
        {/* 2 */}
        <Menu.Item header className='logo'>
          <Link to='/'><Image src={logo} size='tiny'/></Link>
        </Menu.Item>
        {/* 3 */}
        <Menu.Menu className='nav-container'>
          <Menu.Item className='search-input'>
            <Form onSubmit={this.onSubmit}>
              {/* 4 */}
              <Form.Field>
                <Input placeholder='Search'
                       size='small'
                       action='Go'
                       ref={Input => this.search = Input}
                       value={this.state.query}
                       onChange={this.onInputChange}
                />
 
              </Form.Field>
              <Suggestions results={this.state.results} />
              
            </Form>
          
              
          </Menu.Item>
          {/* 5 */}
          <Menu.Menu position='right'>
            <Menu.Item>
              {/* 6 */}
              <Icon className='header-icon' name='video camera' size='large'/>
            </Menu.Item>
            <Menu.Item>
              <Icon className='header-icon' name='grid layout' size='large'/>
            </Menu.Item>
            <Menu.Item>
              <Icon className='header-icon' name='chat' size='large'/>
            </Menu.Item>
            <Menu.Item>
              <Icon className='header-icon' name='alarm' size='large'/>
            </Menu.Item>
            {/* 7*/}
            <Menu.Item name='avatar'>
              <Image src='https://via.placeholder.com/80x80' avatar/>
            </Menu.Item>
          </Menu.Menu>
        </Menu.Menu>
      </Menu>
    );
  }

 


  onInputChange = (event) => {
    this.setState({
      query: event.target.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length > 2) {
          
          const timer=  setTimeout(() => {
            this.getInfo()
          }, 3000);
  
          return ()=>clearTimeout(timer);
  
         
        }
      } else if (!this.state.query) {
      }
    })
  }
  /*this.setState({
    query: this.search.value,
  });
  //const escapedSearchQuery = encodeURI(this.state.query);
  //this.props.history.push(`/results?search_query=${escapedSearchQuery}`);*/

onSubmit = () => {
  const escapedSearchQuery = encodeURI(this.state.query);
  this.props.history.push(`/results?search_query=${escapedSearchQuery}`);
};
getInfo = () => {
  
  //axios.get(`${API_URL}?api_key=${API_KEY}&prefix=${this.state.query}&limit=5`)
  axios.get(`
  https://content.googleapis.com/youtube/v3/search?part=id%2Csnippet&q=${this.state.query}&type=video&maxResults=5&key=AIzaSyBQtGfEOQbYN1Z2NIP-pjASirXFmmoDZWI
  `)
    .then(({ data }) => {
      console.log("data",data)
      this.setState({
        results: data
      })
     
        

      
      console.log(this.state.results)
    })
}
}
//https://content.googleapis.com/youtube/v3
export default withRouter(HeaderNav);