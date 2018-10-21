import React from "react"
import { spy } from "sinon"

import ConditionallyDraggableIdeaContent from "../../web/static/js/components/conditionally_draggable_idea_content"
import STAGES from "../../web/static/js/configs/stages"

const { IDEA_GENERATION } = STAGES

describe("<ConditionallyDraggableIdeaContent />", () => {
  const defaultProps = {
    idea: { body: "body text" },
    currentUser: {},
    retroChannel: {},
    stage: IDEA_GENERATION,
  }

  beforeEach(() => {
    window.innerWidth = 1440
  })

  it("renders the control icons before idea body text to ensure floating/text-wrapping", () => {
    const wrapper = mountWithConnectedSubcomponents(
      <ConditionallyDraggableIdeaContent {...defaultProps} />
    )

    expect(wrapper.html()).to.match(/<i.*><\/i>.*body text/)
  })

  context("when the idea's updated_at value is more than one second greater than its inserted_at value", () => {
    const editedIdea = {
      inserted_at: "2017-04-14T17:30:10",
      updated_at: "2017-04-14T17:30:12",
    }

    const wrapper = mountWithConnectedSubcomponents(
      <ConditionallyDraggableIdeaContent
        {...defaultProps}
        idea={editedIdea}
      />
    )

    it("informs the user that the idea has been edited", () => {
      expect(wrapper.text()).to.match(/\(edited\)/i)
    })
  })

  context("when the idea's updated_at value is equal to its inserted_at value", () => {
    const nonEditedIdea = {
      inserted_at: "2017-04-14T17:30:10",
      updated_at: "2017-04-14T17:30:10",
    }

    const wrapper = mountWithConnectedSubcomponents(
      <ConditionallyDraggableIdeaContent
        {...defaultProps}
        idea={nonEditedIdea}
      />
    )

    it("mentions nothing about the idea being edited", () => {
      expect(wrapper.text()).not.to.match(/\(edited\)/i)
    })
  })

  context("when idea is an action_item and has been assigned to a user", () => {
    const assignee = {
      name: "Betty White",
    }

    const idea = {
      body: "Do the thing",
    }

    const wrapper = mountWithConnectedSubcomponents(
      <ConditionallyDraggableIdeaContent
        {...defaultProps}
        assignee={assignee}
        idea={idea}
      />
    )

    it("contains the user's given_name next to the idea", () => {
      expect(wrapper.text()).to.match(/Do the thing \(Betty White\)/)
    })
  })

  context("when the user is a faciliator and the stage is idea-generation", () => {
    const props = {
      ...defaultProps,
      currentUser: { is_facilitator: true },
      stage: "idea-generation",
    }
    let wrapper

    before(() => {
      wrapper = mountWithConnectedSubcomponents(
        <ConditionallyDraggableIdeaContent {...props} />
      )
    })

    it("sets draggable=true", () => {
      expect(wrapper.html()).to.match(/draggable="true"/)
    })
  })

  context("when the user is a faciliator and the stage is not idea-generation", () => {
    const props = {
      ...defaultProps,
      currentUser: { is_facilitator: true },
      stage: "voting",
    }
    let wrapper

    before(() => {
      wrapper = mountWithConnectedSubcomponents(
        <ConditionallyDraggableIdeaContent {...props} />
      )
    })

    it("sets draggable=false", () => {
      expect(wrapper.html()).to.match(/draggable="false"/)
    })
  })

  context("when the user created the idea and the stage is idea-generation", () => {
    const props = {
      ...defaultProps,
      currentUser: { id: 101 },
      idea: { user_id: 101 },
      stage: "idea-generation",
    }
    let wrapper

    before(() => {
      wrapper = mountWithConnectedSubcomponents(
        <ConditionallyDraggableIdeaContent {...props} />
      )
    })

    it("sets draggable=true", () => {
      expect(wrapper.html()).to.match(/draggable="true"/)
    })
  })

  context("when the user created the idea and the stage is not idea-generation", () => {
    const props = {
      ...defaultProps,
      currentUser: { id: 101 },
      idea: { user_id: 101 },
      stage: "voting",
    }
    let wrapper

    before(() => {
      wrapper = mountWithConnectedSubcomponents(
        <ConditionallyDraggableIdeaContent {...props} />
      )
    })

    it("sets draggable=false", () => {
      expect(wrapper.html()).to.match(/draggable="false"/)
    })
  })

  context("when the user did not create the idea", () => {
    const props = {
      ...defaultProps,
      currentUser: { id: 600 },
      idea: { user_id: 101 },
    }
    let wrapper

    before(() => {
      wrapper = mountWithConnectedSubcomponents(
        <ConditionallyDraggableIdeaContent {...props} />
      )
    })

    it("sets draggable=false", () => {
      expect(wrapper.html()).to.match(/draggable="false"/)
    })
  })

  context("when the idea is being dragged", () => {
    const idea = { id: 1, body: "yo sup" }
    const props = {
      ...defaultProps,
      currentUser: { is_facilitator: true },
      stage: "idea-generation",
      idea,
    }
    const mockEvent = { preventDefault: spy(), dataTransfer: { setData: spy(), dropEffect: null } }

    before(() => {
      const wrapper = mountWithConnectedSubcomponents(
        <ConditionallyDraggableIdeaContent {...props} />
      )

      wrapper.simulate("dragStart", mockEvent)
    })

    it("sets the drop effect on the event to 'move'", () => {
      expect(mockEvent.dataTransfer.dropEffect).to.eql("move")
    })

    it("sets the idea id on the event data element", () => {
      const stringifiedIdea = JSON.stringify(idea)
      expect(
        mockEvent.dataTransfer.setData
      ).calledWith("idea", stringifiedIdea)
    })
  })
})
