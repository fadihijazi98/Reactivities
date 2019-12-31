import React, { Component } from 'react';
import axios from 'axios';
import { Header, Icon, Image, List } from 'semantic-ui-react'
import './App.css';

class App extends Component {
    state = {
      values: []
    }
    componentDidMount() {
      axios.get("http://localhost:5000/api/values").then((response) => {
        console.log(response);
        this.setState({
          values: response.data
        })
      })
      // this.setState({
      //   values: [{id: 1, name: "value 01"}, {id: 2, name: "value 02"}]
      // })
    }
    render() {
      return (
          <div>
              <Header as='h2' icon>
              <Icon name='users' circular />
              <Header.Content>Item's</Header.Content>
              </Header>
            
              <List>
                {this.state.values.map((value: any) => (
                    <List.Item key = {value.id} icon='users' content={value.name} />
                ))}
              </List>
                
          </div>
      )
    }  
}

export default App;
