import { Component } from 'react'

class Modal extends Component {
  render() {
    return (
      <div className="modal-background">
        <div aria-labelledby="modal-message" aria-modal="true" className="modal-body" role="dialog">
          <div id="modal-message">{this.props.message}</div>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>Details</summary>
            {this.props.errorInfo?.componentStack}
          </details>
          <div>Please try it again</div>
          <button onClick={this.props.onClose} type="button">
            Close
          </button>
        </div>
      </div>
    )
  }
}

export default Modal
