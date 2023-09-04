import React from 'react'
import './queryCard.css'

const QueryCard = (data) => {

  const [isActive, setIsActive] = React.useState(false);

  const clickCard = () => {
      setIsActive(!isActive);
  };

  return (
    <div className={`query-card ${isActive ? 'cardActive' : ''}`}>
        <section className="cardHeader" onClick={clickCard}>
            <div className="cardHeaderTitle">{data.data.subject}</div>
            <div className="cardHeaderSupportingText">{data.data.description}</div>
        </section>
        <section className="nonSharedContent">
            {data.data.is_resolved === 0 && <div className="not-resolved-badge">No Response Yet!</div>}
        </section>
    </div>
  )
}

export default QueryCard
