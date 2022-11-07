import { useFormik } from "formik";
import {useEffect, useState} from 'react'
import styled from 'styled-components'
import { useContractRead } from "wagmi";
import CalcOutcome from '../../components/functional/CalcOutcome'
import { DonateSchema } from '../../util/validator'
import WarningCard from '../../components/cards/WarningCard'
import InputRow from '../../components/form/InputRow'
import DonateWrapper from './DonateWrapper'
import donation from "../../abi/donation.json";

const FormWrapper = styled.div`
  background: linear-gradient(132.28deg, rgba(47, 47, 47, 0.3) -21.57%, rgba(0, 0, 0, 0.261) 100%);
  border: 1px solid #3C3C3C;
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
  font-family: "Roboto";
  font-size: 0.9em;
  width: 100%;
  @media (max-width: 500px) {
    width: 100%;
  }
  @media (min-width: 1580px) {
    font-size: 1.1em;
  }
`;


const DonateWithout = ({ pid, currency, bookmarks, currencyAddress, curr, add, home}) => {
    const [amountM, setAmountM] = useState(0);
    const [amountD, setAmountD] = useState(1)

    const [multi, setMulti] = useState("")
    const [conn, setConn] = useState("")

    const outcome = useContractRead({
        addressOrName: add,
        contractInterface: donation.abi,
        functionName: 'calcOutcome',
        chainId: home,
        args: [pid, amountD]
    })

    const connections = useContractRead({
        addressOrName: add,
        contractInterface: donation.abi,
        functionName: 'calcInvolvedMicros',
        chainId: home,
        args: [pid, amountD]
    })

    useEffect(() => {
        setMulti((outcome.data ?? "").toString())
        setConn((connections.data ?? "").toString())
    }, [amountD])

    const handleChangeD = (e) => {
        setAmountD(e.target.value)
    }

    const handleChangeM = (e) => {
        setAmountM(e.target.value)
    }

    const formik = useFormik({
        initialValues: {
            directDonation: amountD,
            microfund: amountM,
        },
        validationSchema: DonateSchema,
    });

    return <> 
    <FormWrapper>
        <InputRow
            id='directDonation'
            name='Donate'
            min={1}
            type='number'
            placeholder='1000'
            onChange={handleChangeD}
            onBlur={formik.handleBlur}
            tooltip={'Multiplier represents the number of deployed microfunds by other users'}
            currency={currency}
            formik={formik}
        />
        <CalcOutcome multi={multi} conn={conn} />
        <InputRow
            id="microfund"
            name="Create microfund"
            min={1}
            type="number"
            placeholder="1000"
            onChange={handleChangeM}
            onBlur={formik.handleBlur}
            tooltip={'Anytime someone donates, the same amount is charged from all active microfunds until it is depleted. Non-depleted amount will be returned to you upon project finish.'}
            currency={currency}
            formik={formik}
        />
    </FormWrapper>
        <WarningCard title={'Beware of scammers!'} description={'TBD'} />
        <FormInfo>
            <li>Funded amount must be approved before sending to the Eyeseek contract</li>
        </FormInfo>

        <DonateWrapper amountM={amountM} amountD={amountD} pid={pid}  bookmarks={bookmarks} currencyAddress={currencyAddress} add={add} curr={curr} home={home} />
    </>
}

export default DonateWithout