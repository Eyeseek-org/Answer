import {TxStatus, LogRow, InfoTag, AnimBox, Ok, Err} from '../components/Log'
import Lottie from 'react-lottie';
import { loadingAnim, okAnim, errAnim } from '../components/animated/Animations';
import {useState, useEffect} from 'react'
import { ChainExplorer } from '../helpers/MultichainHelpers';
import { useNetwork } from 'wagmi';
import { B, G, O, R } from '../components/typography/ColoredTexts';
import ButtonAlt from '../components/buttons/ButtonAlt';
import { Typewriter } from 'react-simple-typewriter'

const LogResult = ({ ev, error, apiError, success, type, data }) => {
    const [explorer, setExplorer] = useState('https://mumbai.polygonscan.com/tx/');
    const {chain} = useNetwork()

    useEffect(() => {
      if (chain){
        setExplorer(ChainExplorer(chain.id))
      }
    },[])
    

    return <>
       {type !== 'Stream project initialized' ? <TxStatus>
                Transaction status
                <LogRow>
                  <InfoTag>Info</InfoTag> 
                  <Typewriter
                      words={[type]}
                      cursor
                      cursorStyle='_'
                      typeSpeed={60}
                      delaySpeed={40000}
                    />
                </LogRow>
                <LogRow>
                  <InfoTag>Info</InfoTag> 
                  <Typewriter
                      words={['...Bloockchain confirmation request']}
                      cursor
                      cursorStyle='_'
                      typeSpeed={60}
                      delaySpeed={40000}
                    />
                </LogRow>
                {!ev && <LogRow><O>Please stay on page until transactions is confirmed</O></LogRow>}
                <LogRow>
                    <InfoTag>Blockchain: </InfoTag>
                  {ev ? <Ok>
                    <Typewriter
                      words={['Success - Transaction was processed']}
                      cursor
                      cursorStyle='_'
                      typeSpeed={60}
                      delaySpeed={40000}
                    />
                  </Ok> :                   
                  <Typewriter
                      words={['...Transaction is usually processed in 5-15 seconds']}
                      cursor
                      cursorStyle='_'
                      typeSpeed={60}
                      delaySpeed={40000}
                    />}
                  {apiError && <Err>
                    <Typewriter
                      words={['Failed - Transaction failed to process in DB']}
                      cursor
                      cursorStyle='_'
                      typeSpeed={60}
                      delaySpeed={40000}
                    />
                    </Err>}
                </LogRow>
                {error && <LogRow>
                    <InfoTag><R>Error</R></InfoTag><>
                    <Typewriter
                      words={[' Tx was rejected or failed, try again later or contact the team ']}
                      cursor
                      cursorStyle='_'
                      typeSpeed={60}
                      delaySpeed={40000}
                    />
                   </>
                </LogRow>}
                {ev && <>
                  <LogRow>
                    <InfoTag>Info</InfoTag>                      
                    <Typewriter
                      words={['Project transaction processed']}
                      cursor
                      cursorStyle='_'
                      typeSpeed={60}
                      delaySpeed={40000}
                    />
                  </LogRow>
                  <LogRow>
                    {data && <><InfoTag>Info</InfoTag> 
                    <a href={`${explorer}${data.hash}`} target="_blank" rel="noopener noreferrer">
                     <B> Transaction detail in blockchain explorer</B>
                    </a></> }
                  </LogRow>
                  <LogRow>
                    <ButtonAlt text="Back to homepage" onClick={() => window.location.href = `/`}/>
                  </LogRow>
                  </>}
                {ev && success && ( <AnimBox> <Lottie height={100} width={100} options={okAnim} /> </AnimBox>)}
                {apiError || error && ( <AnimBox> <Lottie height={100} width={100} options={errAnim} />  </AnimBox> )}
                {!ev && !error && !success && ( <AnimBox> <Lottie height={100} width={100} options={loadingAnim} /> </AnimBox>)}
        </TxStatus>
    :
        <TxStatus>
                Transaction status
                <LogRow>
                  <InfoTag>Info</InfoTag> Project was initiated
                </LogRow>
                {!apiError && <>
                  <LogRow>
                    <InfoTag>Info</InfoTag> <G>Project was created with type: Stream</G>
                  </LogRow>
                  <LogRow>
                    <ButtonAlt text="Back to homepage" onClick={() => window.location.href = `/`}/>
                  </LogRow>
                </>}
                {apiError && ( <AnimBox> <Lottie height={100} width={100} options={errAnim} /></AnimBox> )}
          </TxStatus>
      }
    </>
}

export default LogResult