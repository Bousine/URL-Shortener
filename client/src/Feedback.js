import React from 'react'

function Feedback(props){
  return(
    <div>
     {props.attributes.alreadyShort ?
       <p style={{color: 'blue'}}>Link is already shortened</p> : null}
     {!props.attributes.valid ?
       <p style={{color: 'red'}}>Invalid URL provided. Remember to include
        http(s):// at the beginning of the URL.</p> : null}
     {props.attributes.success && !props.attributes.alreadyShort ?
       <p style={{color: 'green'}}>Copy the shortened link above! :)</p> : null
     }
    </div>
  )
}

export default Feedback
