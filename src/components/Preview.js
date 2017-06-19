import React, {PropTypes} from 'react'

const Preview = React.createClass({

  propTypes: {
    value: PropTypes.string
  },

  shouldComponentUpdate (newProps) {
    return newProps.value !== this.props.value
  },

  render () {
    let defaultId = "indian-script"    
    return (
      <section id="workspace" style={{display: 'block'}}>
        <div id={defaultId} className="us-letter dpi100">
            <div className="page" dangerouslySetInnerHTML={{__html: this.props.value}} />
        </div>
      </section>
    )
  }
})

export default Preview
