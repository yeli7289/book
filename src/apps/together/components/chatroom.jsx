
function localTime(timestamp) {
    var date = (timestamp) ? new Date(timestamp) : new Date(),
        hours = date.getHours() || 12,
        minutes = '' + date.getMinutes(),
        ampm = (date.getHours() >= 12) ? 'pm' : 'am';
        hours = (hours > 12) ? hours - 12 : hours;
        minutes = (minutes.length < 2) ? '0' + minutes : minutes;
    return '' + hours + ':' + minutes + ampm;
};


class Chatroom extends React.Component {
    submit() {
        var message = document.getElementById('messageText1').value;
        var time = Firebase.ServerValue.TIMESTAMP;
        console.log("hi",message);
        this.props.actions.sendMessage(message, time)
        document.getElementById('messageText1').value=""
    }

    clean() {
        this.props.actions.cleanChat();
    }

    deleteMSG(messageKey) {
        this.props.actions.deleteMessage(messageKey);

    }


    close(){
        $('#live-chat').fadeOut(300);
    }

    fold(){
        $('.chat').slideToggle(300, 'swing');
        $('.chat-message-counter').fadeToggle(300, 'swing');
    }

    render(){
        var messages = this.props.messages;
        var chatRoomName=this.props.chatRoomName;

        return (
            <div id="live-chat">

                <header className="clearfix" onClick={() => this.fold()}>

                    <a href="#" className="chat-close" onClick={() => this.close()}>x</a>

                    <h4>{chatRoomName}</h4>

                </header>

                <div className="chat">

                    <div className="chat-history">
                            {

                                Object.keys(messages).map(function(messageKey) {
                                    var message = messages[messageKey];
                                    //console.log(message)
                                    if (message.username == localStorage.getItem('username')) {
                                        return (
                                            <div className="chat-message clearfix">
                                                <img src={'https://avatars3.githubusercontent.com/u/' + message.id}
                                                     alt="avatar" width="32" height="32"/>
                                                <div className="chat-message-content clearfix">
                                                        <div className="chat-time">{localTime(message.time)}</div>
                                                    <h5><b>{message.username}</b></h5>
                                                    <p>{message.message}</p>

                                                </div>

                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div className="chat-message clearfix">
                                                <img src={'https://avatars3.githubusercontent.com/u/' + message.id}
                                                     alt="avatar" width="32" height="32"/>
                                                <div className="chat-message-content clearfix">
                                                    <div className="chat-time">{localTime(message.time)}</div>
                                                    <h5><b>{message.username}</b></h5>
                                                    <p>{message.message}</p>
                                                </div>
                                            </div>
                                        );
                                    }
                                })
                            }
                    </div>

                    <form action="#" method="post">

                        <fieldset>

                            <textarea name="messageText1" id="messageText1" placeholder ="Type your message" rows="3" ></textarea>

                            <div className="row"></div>
                            <a className="waves-effect waves-green btn float left" onClick={this.submit.bind(this)}>Send</a>
                            <a className="waves-effect waves-green btn float right" onClick={this.clean.bind(this)}>Clean</a>

                        </fieldset>

                    </form>



                </div>
            </div>

        );
    }

    // submit(e) {
    //     var message = document.getElementById('messageText1').value;
    //     var time = Firebase.ServerValue.TIMESTAMP;
    //     console.log("hi",message);
    //     this.props.actions.sendMessage(message, time);
    //     document.getElementById('messageText1').value=""
    // }



}
MyComponents.Chatroom = Chatroom

