MyComponents.Info = React.createClass({
	render: function(){
		var line = this.props.title + ': ' + this.props.value
		return <p className="collection-item black-text">{line}</p>
	}
})

MyComponents.Time = React.createClass({
	render: function(){
		console.log('hi')
		var title = _.keys(this.props.value)
		var Info = _.values(this.props.value).map(function(v, k){
			return <MyComponents.Info title={title[k]} value={v} />
		})
		
		return <li className="collection-item">
                <h6 className="blue-grey darken-4 white-text">{this.props.time}<a onClick={this.remove.bind(this)}><i className="material-icons">delete</i></a></h6>
                {Info}
			</li>

	},
	remove(){
		var group = this.props.group;
		var day = this.props.day;
		var time = this.props.time;
		this.props.removelist(group, day, time)
	}
})


class List extends React.Component{
	render(){
		var time = this.props.data.time
		var removelist = this.props.actions.removeList
		var group = this.props.data.group;
		var day = this.props.data.day;
		var list = this.props.data.list.map(function(v, k){
			return <MyComponents.Time group={group} day={day} time={time[k]} value={v} removelist={removelist}/>
		})
		return <div className="card blue-grey darken-4 center-align">
			<div className="card-content white-text">
          		<span className="card-title">
					{this.props.data.day}
				</span>
        		<ul className="collection" >{list}</ul>
        	 </div>
        </div>	
	}
	// componentDidMount() {
	// 	$(document).ready(function () {
	// 		$('.collapsible').collapsible({
	// 			accordion: false
	// 		});
	// 	});
	// }
}

MyComponents.List = List;
	