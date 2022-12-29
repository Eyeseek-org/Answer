import {TxStatus, LogRow, InfoTag, AnimBox, Ok, Err} from '../components/Log'
import Lottie from 'react-lottie';
import { loadingAnim, okAnim, errAnim } from '../components/animated/Animations';
import {useState, useEffect} from 'react'
import { ChainExplorer } from '../helpers/MultichainHelpers';
import { useNetwork } from 'wagmi';
import { B, G, O, R } from '../components/typography/ColoredTexts';
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
                {error &&  error.message.startsWith('user rejected') ? null : <>
                <LogRow>
                  <InfoTag>Info</InfoTag> 
                  <Typewriter
                      words={['...Bloockchain confirmation requested (usually in 5-15 seconds)']}
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
                  </Ok> :  <Typewriter
                      words={['Wait, usually processed in 5-15 seconds']}
                      cursor
                      cursorStyle='_'
                      typeSpeed={60}
                      delaySpeed={40000}
                    /> }
                  {apiError && <Err>
                    <Typewriter
                      words={['Failed - Transaction failed']}
                      cursor
                      cursorStyle='_'
                      typeSpeed={60}
                      delaySpeed={40000}
                    />
                    </Err>}
                </LogRow>
                </>}
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
                    {data && <><InfoTag>Info</InfoTag> 
                    <a href={`${explorer}${data.hash}`} target="_blank" rel="noopener noreferrer">
                     <B> <u>Transaction detail in blockchain explorer</u></B>
                    </a></> }
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
                </>}
                {apiError && ( <AnimBox> <Lottie height={100} width={100} options={errAnim} /></AnimBox> )}
          </TxStatus>
      }
    </>
}

export default LogResult