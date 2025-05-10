import '../styles/home.css'
import { Tweetbox } from './Tweetbox'
import { TweetsSection } from './TweetsSection'
import { LogoutPopup } from './LogoutPopup'
import Login from './Login'
import LoginSelect from './LoginSelect'

export function Home() {
    return (
        <>
        <div className="page-label">
    <h1>Home</h1>
        </div>
        <Tweetbox />
        <TweetsSection>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque commodi, eveniet sint repellendus saepe, repellat consequuntur dolorum dolores vel quasi hic cumque laborum debitis quia porro facere culpa placeat ex?
        </TweetsSection>
        <TweetsSection>
            Hej hopp, kaffekopp!
        </TweetsSection>
        <LogoutPopup />
        <Login />
        <LoginSelect />
        </>
    )
}