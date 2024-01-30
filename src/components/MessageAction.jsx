import '../styles/MessageAction.css';

const MessageAction = ({message, object}) => {

  var eventMessage = document.getElementById(message);
  eventMessage.style.display = 'block';
  setTimeout(function() {
    eventMessage.style.display = 'none';
  }, 3000);

  return(
    <>
      <h1>fsafs</h1>
      <div id="success-message" className="success-message">
        ¡New {object} added successfully!
      </div>
      <div id="success-message-update" className="success-message-update">
      !{object} updated successfully!
      </div>
      <div id="delete-message" className="delete-message">
        ¡{object} deleted successfully!
      </div>
    </>
  )
}

export default MessageAction;