import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Card from './components/Card'
import data from "./data.js";

function App() {
    const cards = data.map((data) => {
        return(
            <Card
                key={data.id}
                {...data}
            />
        )
    })
  return (
    <>
      <Navbar />
      <Hero />
        <section className={"cards-list"}>
            {cards}
        </section>
    </>
  )
    
}

export default App
