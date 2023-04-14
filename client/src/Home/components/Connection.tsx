import { useLogIN } from '../../../ContextLog'
import Hero from './seaction1/Hero'
import Footer from './seaction2/Footer'
import Growth from './seaction2/Growth'

const Connection = () => {
 const { dark } = useLogIN()
 return (
  <div>
   <Hero />

   <Growth />
   <Footer />
  </div>
 )
}

export default Connection
