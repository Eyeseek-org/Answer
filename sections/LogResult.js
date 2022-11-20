import {TxStatus, LogRow, InfoTag, AnimBox, Ok, Err} from '../components/Log'
import Lottie from 'react-lottie';
import { loadingAnim, okAnim, errAnim } from '../components/animated/Animations';

const LogResult = ({ ev, error, apiError, success, type }) => {
    return <>
       {type !== 'Stream project initialized' ? <TxStatus>
                Transaction status
                <LogRow>
                  <InfoTag>Info</InfoTag> {type}
                </LogRow>
                <LogRow>
                  <InfoTag>Info</InfoTag> ...Waiting for blockchain confirmation
                </LogRow>
                {!ev && <LogRow>Please stay on page until transactions is confirmed</LogRow>}
                <LogRow>
                  <div>
                    <InfoTag>Blockchain: </InfoTag>
                  </div>
                  {ev && <Ok>Success - Transaction was processed</Ok>} {apiError && <Err>Failed - Transaction failed to process in DB</Err>}
                </LogRow>
                {ev && (
                  <LogRow>
                    <InfoTag>Success</InfoTag> Project transaction processed
                  </LogRow>
                )}
                {ev && success && ( <AnimBox> <Lottie height={100} width={100} options={okAnim} /> </AnimBox>)}
                {apiError && ( <AnimBox> <Lottie height={100} width={100} options={errAnim} />  </AnimBox> )}
                {!ev && !apiError && !success && ( <AnimBox> <Lottie height={100} width={100} options={loadingAnim} /> </AnimBox>)}
        </TxStatus>
    :
        <TxStatus>
                Transaction status
                <LogRow>
                  <InfoTag>Info</InfoTag> Project was initiated
                </LogRow>
                {!apiError && (
                  <LogRow>
                    <InfoTag>Info</InfoTag> Project was created
                  </LogRow>
                )}
                {apiError && ( <AnimBox> <Lottie height={100} width={100} options={errAnim} /></AnimBox> )}
                {!apiError && !success && ( <AnimBox> <Lottie height={100} width={100} options={loadingAnim} /></AnimBox> )}
          </TxStatus>
      }
    </>
}

export default LogResult