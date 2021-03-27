import { hypostyle } from 'hypostyle'
import { Hypo, Box } from '.'

const App = (
  <Hypo hypostyle={hypostyle()}>
    <Box as='button' css={{ c: 'white' }} cx={{ c: 'white' }} />
  </Hypo>
)
