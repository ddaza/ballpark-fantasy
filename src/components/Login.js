import React from 'react';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: ''};
    }

    handleNameChange(e) {
        this.setState({name: e.target.value});
    }

    handleSubmit(e) {
        // e.preventDefault();
        var name = this.state.name.trim();
        //TODO: how to transition to next page (game list) here?
    }

    render() {
        return (
          <div>
            <h2>Login</h2>
            <form className="loginForm" onSubmit={this.handleSubmit.bind(this)}>
                <input
                  type="text"
                  placeholder="Your name"
                  value={this.state.name}
                  onChange={this.handleNameChange.bind(this)}
                />
                <input type="submit" value="Create" />
                <br/>
                <input type="text" placeholder="Game Code" />
                <input type="submit" value="Join" />
            </form>

            <p>{this.state.name}</p>
          </div>
        )
    }
}

