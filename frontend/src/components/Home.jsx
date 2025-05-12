import { Tweetbox } from './Tweetbox'
import { TweetsSection } from './TweetsSection'
import Footer from './Footer.jsx'
import { Aside } from '../components/Aside.jsx'
import '../styles/home.css'

export function Home() {
    return (
        <>
                <div className="content-frame">
                <div className="content-column">
                <Tweetbox />
                <TweetsSection>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque commodi, eveniet sint repellendus saepe, repellat consequuntur dolorum dolores vel quasi hic cumque laborum debitis quia porro facere culpa placeat ex?
                </TweetsSection>
                <TweetsSection>
                    Hej hopp, kaffekopp!
                </TweetsSection>
                </div>
                <Aside />
                </div>
                <Footer />
                </>
    )
}