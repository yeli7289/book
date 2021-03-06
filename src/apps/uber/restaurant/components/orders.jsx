class Orders extends React.Component {

  render(){

    if (this.props.user){
      // user is authenticated
      console.log(this.props)
      return <div className="card-panel deep-orange lighten-1 white-text">
          <h2>Hello {this.props.user.displayName}({this.props.user.username})!</h2>
          <a href="#" onClick={this.props.logoutAction} className="waves-effect waves-light btn orange">Logout</a>
      </div>
    } else {
      // user is not set
      return <div className="card-panel deep-orange lighten-1">
        <h2 className="white-text">Add an Order to be delivered</h2>
        <a href="#" onClick={this.props.loginAction} className="waves-effect waves-light btn orange">Add Order</a>
      </div>
    }
  }

}
MyComponents.Orders = Orders