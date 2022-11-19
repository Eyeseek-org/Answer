import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useContractRead } from 'wagmi';
import CalcOutcome from '../../components/functional/CalcOutcome';
import { DonateSchema } from '../../util/validator';
import WarningCard from '../../components/cards/WarningCard';
import InputRow from '../../components/form/InputRow';
import DonateWrapper from './DonateWrapper';
import donation from '../../abi/donation.json';

// Donates directly any amount without reward

const FormWrapper = styled.div`
  background: ${(props) => props.theme.colors.gradient};
  border: 1px solid #3c3c3c;
  border-radius: 5px;
  padding: 10px 20px;
  padding: 2rem 5rem 1rem 5rem;
  margin-bottom: 3%;
  margin-top: 3%;
  @media (max-width: 769px) {
    padding: 2rem 1rem 1rem 3rem;
  }
  @media (max-width: 500px) {
    padding: 2rem 1rem 1rem 1rem;
  }
`;

const FormInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5%;
  font-family: 'Roboto';
  font-size: 0.9em;
  width: 100%;
  @media (max-width: 500px) {
    width: 100%;
  }
  @media (min-width: 1580px) {
    font-size: 1.1em;
  }
`;

const DonateWithout = ({ pid, currency, bookmarks, currencyAddress, curr, add, home, rid }) => {
  const [multi, setMulti] = useState('');
  const [conn, setConn] = useState('');
  const { appState, setAppState } = useApp();
  const { rewMAmount, rewDAmount } = appState;

  const outcome = useContractRead({
    address: add,
    abi: donation.abi,
    functionName: 'calcOutcome',
    chainId: home,
    args: [pid, amountD],
  });

  const connections = useContractRead({
    address: add,
    abi: donation.abi,
    functionName: 'calcInvolvedMicros',
    chainId: home,
    args: [pid, amountD],
  });

  useEffect(() => {
    setMulti((outcome.data ?? '').toString());
    setConn((connections.data ?? '').toString());
  }, []);

  const handleChangeD = (e) => {
    setAppState(appState => ({ ...appState, rewDAmount: e.target.value }));
    console.log(rewDAmount);
  };

  const handleChangeM = (e) => {
    setAppState(appState => ({ ...appState, rewMAmount: e.target.value }));
    console.log(rewMAmount);
  };

  const formik = useFormik({
    initialValues: {
      directDonation: rewDAmount,
      microfund: rewMAmount,
    },
    validationSchema: DonateSchema,
  });

  return (
    <>
      <FormWrapper>
        <InputRow
          id="directDonation"
          name="Donate"
          min={0}
          placeholder="1000"
          onChange={handleChangeD}
          onBlur={formik.handleBlur}
          tooltip={'Multiplier represents the number of deployed microfunds by other users'}
          currency={currency}
        />
        <CalcOutcome multi={multi} conn={conn} currency={currency} />
        <InputRow
          id="microfund"
          name="Create microfund"
          min={0}
          placeholder="1000"
          onChange={handleChangeM}
          onBlur={formik.handleBlur}
          tooltip={
            'Anytime someone donates, the same amount is charged from all active microfunds until it is depleted. Non-depleted amount will be returned to you upon project finish.'
          }
          currency={currency}
        />
      </FormWrapper>
      <WarningCard title={'Beware of scammers!'} description={'TBD'} />
      <FormInfo>
        <li>Funded amount must be approved before sending to the Eyeseek contract</li>
      </FormInfo>
      <DonateWrapper
        pid={pid}
        bookmarks={bookmarks}
        currencyAddress={currencyAddress}
        add={add}
        curr={curr}
        home={home}
        rid={rid}
      />
    </>
  );
};

export default DonateWithout;
