import { useEffect } from 'react';
import { useApp } from '../utils/appContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Select from 'react-select';
import SectionTitle from '../../components/typography/SectionTitle';
import ProjectTypeSelection from './ProjectTypeSelection';
import { categories } from '../../data/categories';
import { Wrapper } from '../../components/format/Box';
import ButtonAlt from '../../components/buttons/ButtonAlt';
import { BetweenRow } from '../../components/format/Row';
import { MainContainer } from '../../components/format/Box';
import { Container } from './Styles';

const Category = ({ setStep }) => {
  const { appState, setAppState } = useApp();
  const { category, subcategory } = { ...appState };
  const router = useRouter();

  useEffect(() => {
    setAppState((prev) => ({ ...prev, isNext: subcategory !== undefined }));
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

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      background: '#141414',
      border: '1px solid #FFFFFF',
      borderRadius: '15px',
    }),
    control: (provided) => ({
      ...provided,
      padding: '1%',
      background: 'rgba(107, 255, 255, 0.05)',
      border: '1px solid #FFFFFF',
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
      color: '#B0F6FF',
      fontSize: '0.9em',
    }),
  };


  return (
    <MainContainer>
      <SectionTitle
        title="Categorize your project"
        subtitle={'Define the way of funding and the project industry.'}
      />
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
    </MainContainer>
  );
};

export default Category;
