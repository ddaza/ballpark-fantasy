import React from 'react';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: '',
                      code: ''};
    }

    handleNameChange(e) {
        this.setState({name: e.target.value});
    }

    handleCodeChange(e) {
        this.setState({code: e.target.value});
    }

    handleSubmit(e) {
        var name = this.state.name.trim();
        var code = this.state.code.trim();
        //TODO: verification of code, e.g. if code doesn't exist
        //TODO: no distinction between "create" and "join" buttons, this will still
        //try to log into code even if "create" was clicked
        if (code) {
            window.location.hash = 'game?name=' + name + '&code=' + code;
        } else {
            window.location.hash = 'game_list?name=' + name;
        }
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
                <input
                  type="text"
                  placeholder="Game Code"
                  value={this.state.code}
                  onChange={this.handleCodeChange.bind(this)}
                />
                <input type="submit" value="Join" />
            </form>

            <p>{this.state.name}</p>
          </div>
        )
    }
}

