import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import styled, {useTheme} from 'styled-components';
import { useContractRead } from 'wagmi';
import CalcOutcome from '../../components/functional/CalcOutcome';
import { DonateSchema } from '../../util/validator';
import { useApp } from '../utils/appContext';
import InputRow from '../../components/form/InputRow';
import DonateWrapper from './DonateWrapper';
import diamondAbi from '../../abi/diamondAbi.json';
import { AbsoluteRight, MainContainer } from '../../components/format/Box';
import Subtitle from '../../components/typography/Subtitle';
import { DonateIcon } from '../../components/icons/Project';
import { MicrofundIcon } from '../../components/icons/Landing';
import { RowCenter } from '../../components/format/Row';
import { diamond } from '../../data/contracts/core';

// Donates directly any amount without reward

const FormWrapper = styled.div`
  background: ${(props) => props.theme.colors.gradient};
  border: 1px solid #3c3c3c;
  border-radius: 5px;
  padding: 2rem 5rem 1rem 5rem;
  margin: 9%;
  margin-top: 4%;
  margin-bottom: 4%;
  @media (max-width: 769px) {
    padding: 2rem 1rem 1rem 3rem;
  }
  @media (max-width: 500px) {
    padding: 2rem 1rem 1rem 1rem;
  }
`;

const DonateWithout = ({ pid, currency, bookmarks, currencyAddress, curr, home, rid }) => {
  const [multi, setMulti] = useState('');
  const [conn, setConn] = useState('');
  const { appState, setAppState } = useApp();
  const { rewMAmount, rewDAmount } = appState;
  const [add, setAdd] = useState();
  const theme = useTheme()

  const outcome = useContractRead({
    address: add,
    abi: diamondAbi,
    functionName: 'calcOutcome',
    chainId: home,
    args: [pid, rewDAmount],
    watch: true
  });

  const connections = useContractRead({
    address: add,
    abi: diamondAbi,
    functionName: 'calcInvolvedMicros',
    chainId: home,
    args: [pid, rewDAmount],
    watch: true
  });




  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENV !== 'production'){
      setAdd(diamond.mumbai)
    } else {
      setAdd(diamond.polygon);
    }
    setMulti((outcome.data ?? '').toString());
    setConn((connections.data ?? '').toString());
  }, [rewDAmount]);

  const handleChangeD = (e) => {
    setAppState(appState => ({ ...appState, rewDAmount: e.target.value * 1000000 }));
  };

  const handleChangeM = (e) => {
    setAppState(appState => ({ ...appState, rewMAmount: e.target.value * 1000000 }));
  };

  const formik = useFormik({
    initialValues: {
      directDonation: rewDAmount,
      microfund: rewMAmount,
    },
    validationSchema: DonateSchema,
  });

  return (
    <MainContainer>
      <Subtitle text="Choose donation type and pledge any amount" />
      <FormWrapper>
      <RowCenter><InputRow
          id="directDonation"
          name={<><DonateIcon width={50}/></>}
          min={0}
          placeholder="1000"
          onChange={handleChangeD}
          onBlur={formik.handleBlur}
          tooltip={'Donation: Direct pledge to the project. If project is not successful, amount is returned.'}
          currency={currency}
        />          
        <AbsoluteRight><CalcOutcome multi={multi} conn={conn} /></AbsoluteRight>
      </RowCenter>
      <RowCenter>
        <InputRow
          id="microfund"
          name={<><MicrofundIcon width={50} color={theme.colors.icon}/></>}
          min={0}
          placeholder="1000"
          onChange={handleChangeM}
          onBlur={formik.handleBlur}
          tooltip={
            'Microfund: Anytime someone donates, the same amount is charged from all active microfunds until it is depleted. Non-depleted amount will be returned to you upon project finish.'
          }
          currency={currency}
        />
        </RowCenter>
      </FormWrapper>
      <DonateWrapper
        pid={pid}
        bookmarks={bookmarks}
        currencyAddress={currencyAddress}
        curr={curr}
        home={home}
        rid={rid}
      />
    </MainContainer>
  );
};

export default DonateWithout;
