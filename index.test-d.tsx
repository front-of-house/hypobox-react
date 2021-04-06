import { hypostyle } from 'hypostyle'
import { Hypo, Box, compose } from '.'

const H1 = compose('h1', {
  fs: 0
})

const H2 = compose(H1, {
  fs: 0
})

const App = (
  <Hypo hypostyle={hypostyle()}>
    <H1 mb={2} />
    <Box as='button' cx={{ c: 'white' }} />
  </Hypo>
)
