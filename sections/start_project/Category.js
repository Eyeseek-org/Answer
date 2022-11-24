import { useEffect, useState } from 'react';
import { useApp } from '../utils/appContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {useTheme} from 'styled-components'
import Select from 'react-select';
import SectionTitle from '../../components/typography/SectionTitle';
import ProjectTypeSelection from './ProjectTypeSelection';
import { categories } from '../../data/categories';
import { Wrapper } from '../../components/format/Box';
import ButtonAlt from '../../components/buttons/ButtonAlt';
import { BetweenRow } from '../../components/format/Row';
import { MainContainer } from '../../components/format/Box';
import { Container } from './Styles';
import axios from 'axios';
import { moralisApiConfig } from '../../data/moralisApiConfig';
import ErrText from '../../components/typography/ErrText';


const Category = ({ setStep }) => {
  const { appState, setAppState } = useApp();
  const { category, subcategory } = { ...appState };
  const [apiError, setApiError] = useState(false)
  const router = useRouter();
  const theme = useTheme()

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      background: '#141414',
      border: `1px solid ${theme.colors.white}`,
      borderRadius: '15px',
    }),
    control: (provided) => ({
      ...provided,
      padding: '1%',
      background: 'rgba(107, 255, 255, 0.05)',
      border: `1px solid ${theme.colors.white}`,
      borderRadius: '15px',
      '&:hover': {
        background: 'rgba(107, 255, 255, 0.05)',
        cursor: 'pointer',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      padding: '1%',
      fontSize: '0.9em',
      color: '#B0F6FF',
      background: state.isSelected ? 'rgba(107, 255, 255, 0.2)' : 'transparent',
      '&:hover': {
        background: 'rgba(107, 255, 255, 0.05)',
        cursor: 'pointer',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: `${theme.colors.primary}`,
      fontSize: '0.9em',
    }),
  };

  useEffect(() => {
    setAppState((prev) => ({ ...prev, isNext: subcategory !== undefined }));
    healthCheck();
  }, []);

  const categoryKey = Object.keys(categories)
    .sort()
    .map((cat) => ({ label: cat, value: cat }));
  const subcategoryKey = categories[category] && categories[category].sort().map((cat) => ({ label: cat, value: cat }));
  
  const handleClick = () => {
    setStep((prev) => (prev += 1));
    setAppState((prev) => ({ ...prev, isNext: false }));
  };

  const handleBack = () => { router.push('/'); };
  const handleCategory = (e) => setAppState((prev) => ({ ...prev, category: e.value }));
  const handleSubCategory = (e) => setAppState((prev) => ({ ...prev, subcategory: e.value, isNext: true }));

  const healthCheck = async() => {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/_Role`, moralisApiConfig);
      setApiError(false)
    } catch (err) {
      setApiError(true)
    }
  }

  const getNft = async (address, id) => {
    try {
      const res = await axios.get(
        `https://deep-index.moralis.io/api/v2/nft/${address}/${id}`,
        { params },
        {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_MORALIS_API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(res.data);
      if (res.data.length > 0) {
        setIpfsUri(res.data.result.token_uri);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainContainer>
      <SectionTitle
        title="Categorize your project"
        subtitle={'Define the way of funding and the project industry.'}
      />
      {!apiError ? 
      <Wrapper>
        <ProjectTypeSelection />
        <Container>
          <Select
            className="select-category"
            defaultValue={{ label: category || 'Select Category', value: category }}
            options={categoryKey}
            onChange={handleCategory}
            styles={customStyles}
          />
          <Select
            className="select-category"
            defaultValue={{ label: subcategory || 'Select Subcategory', value: subcategory }}
            placeholder="Select SubCategory"
            options={subcategoryKey}
            onChange={handleSubCategory}
            styles={customStyles}
          />
        </Container>
        <BetweenRow>
          <Link href="/">
            <ButtonAlt onClick={handleBack} text='Back to homepage'/>
          </Link>
             <ButtonAlt onClick={handleClick} text='Next'/>
        </BetweenRow>
      </Wrapper>
      : <ErrText>Service is temporarily down</ErrText>}
    </MainContainer>
  );
};

export default Category;
