import React from "react"
import classNames from "classnames"

import IdeaList from "./idea_list"

import * as AppPropTypes from "../prop_types"
import styles from "./css_modules/tabular_board_layout.css"

const TabularBoardLayout = props => {
  return (
    <React.Fragment>
      <div className="ui tabular menu">
        {props.categories.map(category => {
          const active = category === "happy"

          const classes = classNames("item", styles.tab, { active })

          return (
            <div className={classes} key={category}>
              <img
                alt={category}
                src={`/images/${category}.svg`}
                height={40}
                width={40}
              />
            </div>
          )
        })}
      </div>

      <div className={styles.ideaListWrapper}>
        <IdeaList category="happy" votes={[]} {...props} />
      </div>
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
