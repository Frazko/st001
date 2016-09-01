import React from 'react';

import FacebookButton from './components/FacebookButton.jsx';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'App';

		this.state = {
			messages: [
			'Por fin sirve esta vara'

			]
		};
	}


	render() {
		var messagesNodes = this.state.messages.map((message) => {
			return ( <div> { message } </div>)
		});


		return <div><FacebookButton fb={FB} /> { messagesNodes } </div>;
	}
}

export default App;
