import React from 'react';

export default class FacebookButton extends React.Component {
    constructor(props) {
        super(props);

        this.FB = props.fb;

        this.state = {
            message: "",
            friendsList: [],
            isLoggedIn: false,
            loginBtn: "Entrar"
        };
    }

    componentDidMount() {
        this.FB.Event.subscribe('auth.logout',
            this.onLogout.bind(this));

        this.FB.Event.subscribe('auth.statusChange',
            this.onStatusChange.bind(this));
    }

    onLogin() {
        console.log('click');
        if (!this.state.isLoggedIn) {
            this.FB.login((response) => {
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    this.FB.api('/me', (response) => {
                        console.log('Good to see you, ' + response.name + '.');
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            }, { scope: 'user_friends, public_profile, user_birthday, email, user_about_me' });

        } else {
            this.logout();
        }
    }

    logout() {
        console.log('logout()');
        this.FB.logout((response) => {
            console.log('User is now logged out', response);
        });
    }

    onStatusChange(response) {
        console.log(response);

        if (response.status === "connected") {
            this.state.isLoggedIn = true;
            this.state.loginBtn = "Salir";

            this.FB.api('/me',
                response => {
                    var message = "Welcome " + response.name;
                    this.setState({
                        message: message
                    });
                    console.log("me",response);

                    // Disparar USER save en firebase
                });

            this.FB.api('/me/picture?width=180&height=180',
                (response) => {
                    // var picUrl = '<img src="http://graph.facebook.com/' + response.id + '/picture" />';
                    //  http://graph.facebook.com/10154055323235269/picture
                    console.log("Profile pic",response.data.url);
                    this.setState({
                        profilePic: response.data.url
                    });

                    // Disparar update IMAGE 
                });

            this.FB.api('/me/friends', { fields: 'name,id,location,birthday' },
                (response) => {
                    console.log("friends",response.data);
                    console.log("--", this.friendsList(response.data));


                    this.setState({
                        friendsList: this.friendsList(response.data)
                    });

                    console.log(this.state.friendsList);

                });
        }
    }


    friendsList(list) {
        return list.map((value) => < li > < img src = { "http://graph.facebook.com/" + value.id + "/picture" }
            /></li > );
    }

    onLogout() {
        console.log('onLogout --- ');
        this.setState({
            message: "",
            profilePic: "",
            isLoggedIn: false,
            loginBtn: "Entrar",
            friendsList: []
        });
    }



    render() {
       return (
          <div>
          <div><img src={this.state.profilePic} /></div>
          <div>{this.state.message}</div>

          <button className="btn btn-primary" onClick={this.onLogin.bind(this)}> entrar </button>
          <button className="btn btn-primary" onClick={this.onLogout.bind(this)}> salir </button>

          <div><ul>{this.state.friendsList}</ul></div>
          </div>
          );
    }
};
