import React from "react"

import IdeaList from "./idea_list"

import * as AppPropTypes from "../prop_types"

const TabularBoardLayout = props => {
  return (
    <React.Fragment>
      <div className={`ui three item tabular menu`}>
        <div className="active item">
          <img src="/images/happy.svg" height={40} width={40} />
        </div>
        <div className="item">
          <img src="/images/sad.svg" height={40} width={40} />
        </div>
        <div className="item">
          <img src="/images/confused.svg" height={40} width={40} />
        </div>
      </div>

      <IdeaList category="happy" votes={[]} {...props} />
    </React.Fragment>
  )
}

TabularBoardLayout.propTypes = {
  currentUser: AppPropTypes.presence.isRequired,
  ideas: AppPropTypes.ideas.isRequired,
  retroChannel: AppPropTypes.retroChannel.isRequired,
  stage: AppPropTypes.stage.isRequired,
  categories: AppPropTypes.categories.isRequired,
}

export default TabularBoardLayout
