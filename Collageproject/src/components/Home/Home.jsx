import AdviceCards from "./Cards";
import ActionCard from "./Cards";
import HeroSection from "./Cards";
import Hero from "./hero";
import SeniorGuide from "./Seniorguide";
import Workcards from "./Workcards";


function Home() {
    return ( <div>
<Hero />
<Workcards />
<SeniorGuide />
<AdviceCards />

    </div> );
}

export default Home;