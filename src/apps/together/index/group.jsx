MyComponents.Group = React.createClass({
	render: function(){
		//link to travel.html page
		return <li className="collection-item blue-grey darken-3"><a onClick={this.Join.bind(this)} href="travel.html">{this.props.group}</a></li>
	},
	Join(){
		// store the group name
		localStorage.setItem('group', this.props.group)
		// set user name in firebase 
		this.props.joinGroup(this.props.group, this.props.user)
	}
});

class Groups extends React.Component{
	render(){
		var user = this.props.data.user;
		var joinGroup = this.props.actions.joinGroup
		var g = this.props.data.group.map(function (v, i) {
			return <MyComponents.Group group={v} key={i} user={user} joinGroup={joinGroup}/>
		});
		return <div className="card blue-grey darken-4 center-align">
			<div className="card-content white-text">
          		<span className="card-title">Groups</span>
        		<ul className="collection">{g}</ul>
        	 </div>
        </div>
	}
}
MyComponents.Groups = Groups;

class Form extends React.Component{
	render(){
		return <div className="card">
			<div className="row">
				<form className="col s12">
					<div>
						<h5 className="center-align">Make Group</h5>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input id="g" type="text" className="validate"/>
							<label for="g">Group Name</label>
						</div>
					</div>
					<div className="submit">
						<a className="waves-effect waves-green btn" onClick={this.makegroup.bind(this)}>Make</a>
					</div>
					</form>
				</div>
			</div>
	}
	makegroup(e){
		var groupName = $('#g').val();
		var time = Firebase.ServerValue.TIMESTAMP;
		var user = this.props.data.user;
		this.props.actions.makeGroup(groupName, time, user);
	}
}
MyComponents.Form = Form;
	