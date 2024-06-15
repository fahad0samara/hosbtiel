import { useLogIN } from '../../../ContextLog'
import About from './seaction1/About'

import Hero from './seaction1/Hero'
import Footer from './seaction2/Footer'
import Growth from './seaction2/Growth'

const Connection = () => {
 const { dark } = useLogIN()
 return (
  <div>
   <Hero />
   <About />

   <Growth />
   <Footer />
  </div>
 )
}

export default Connection
