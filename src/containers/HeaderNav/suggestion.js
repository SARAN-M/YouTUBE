import React from 'react';
 
const Suggestions = (props) => {
    if(props.results!='' && props.results?.items.length>0){
  const options = props.results.items.map(r => (
    <li key={r.id.videoId}>
      {r.snippet.title}
    </li>
  ))
  //console.log("options",options)
  return <ul>{options}</ul>
    }
    else{
        return <span></span>
    }
}
 
export default Suggestions;