import React from "react"
import MediaQuery from "react-responsive"
import includes from "lodash/includes"

import * as AppPropTypes from "../prop_types"
import ColumnarBoardLayout from "./columnar_board_layout"
import TabularBoardLayout from "./tabular_board_layout"
import STAGES from "../configs/stages"

const { ACTION_ITEMS, CLOSED } = STAGES

const IdeaBoard = props => {
  const { stage, categories } = props
  const showActionItem = includes([ACTION_ITEMS, CLOSED], stage)
  const renderableColumnCategories = [...categories]
  if (showActionItem) { renderableColumnCategories.push("action-item") }

  return ([
    <MediaQuery maxWidth={767}>
      <TabularBoardLayout {...props} categories={renderableColumnCategories} />
    </MediaQuery>,

    <MediaQuery minWidth={768}>
      <ColumnarBoardLayout {...props} categories={renderableColumnCategories} />
    </MediaQuery>,
  ])
}

IdeaBoard.propTypes = {
  currentUser: AppPropTypes.presence.isRequired,
  ideas: AppPropTypes.ideas.isRequired,
  retroChannel: AppPropTypes.retroChannel.isRequired,
  stage: AppPropTypes.stage.isRequired,
  categories: AppPropTypes.categories.isRequired,
}

export default IdeaBoard
