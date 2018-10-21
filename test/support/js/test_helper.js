import chai, { expect } from "chai"
import chaiUUID from "chai-uuid"
import sinonChai from "sinon-chai"

import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import sinon from "sinon"
import { Socket } from "phoenix"
import PropTypes from "prop-types"
import noop from "lodash/noop"
import STAGES from "../../../web/static/js/configs/stages"

chai.use(chaiUUID)
chai.use(sinonChai)

const { IDEA_GENERATION } = STAGES

Enzyme.configure({ adapter: new Adapter() })

global.hj = noop
global.expect = expect

global.requestAnimationFrame = callback => {
  setTimeout(callback, 0)
}

const store = {
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({
    retro: {
      facilitator_id: 1,
      stage: IDEA_GENERATION,
    },
    ideas: [],
    votes: [],
    usersById: {},
    presences: [],
    mobile: {
      selectedCategoryTab: "happy",
    },
  }),
}

const defaultOptions = {
  context: { store },
  childContextTypes: { store: PropTypes.object.isRequired },
}

global.renderWithConnectedSubcomponents = (component, options) => {
  return Enzyme.render(component, { ...defaultOptions, ...options })
}

global.mountWithConnectedSubcomponents = (component, options) => {
  return Enzyme.mount(component, { ...defaultOptions, ...options })
}

/*
/  triggering websocket "receive"s in tests is highly laborious, so we extract it out to a helper
/  that allows us to setup a mock channel, and trigger 'receive' messages on our pushes like so:
/    const mockRetroChannel = setupMockPhoenixChannel()
/    const push = mockRetroChannel.push("some_event", some_payload)
/    push.trigger("error", {})
*/

// eslint-disable-next-line import/prefer-default-export
export const setupMockPhoenixChannel = () => {
  const socket = new Socket("/socket", { timeout: 1 })

  sinon.stub(socket, "makeRef", () => 0)
  sinon.stub(socket, "isConnected", () => true)

  sinon.stub(socket, "push")

  const mockPhoenixChannel = socket.channel("topic", { one: "two" })
  mockPhoenixChannel.join().trigger("ok", {})

  return mockPhoenixChannel
}
