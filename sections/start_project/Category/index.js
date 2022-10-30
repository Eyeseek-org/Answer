import { useEffect } from "react";
import { useApp } from "../../utils/appContext";
import { MainContainer, SiteContainer, Container, ButtonContainer, NextButton, DisButton } from "./StyleWrapper";

import Link from "next/link";
import Select from "react-select";
import SectionTitle from "../../../components/typography/SectionTitle";
import ProjectTypeSelection from '../ProjectTypeSelection';
import {categories} from '../../../data/categories'

const Category = ({ setStep }) => {
  const { appState, setAppState } = useApp();
  const { category, subcategory } = { ...appState };

  useEffect(() => {
    setAppState((prev) => ({ ...prev, isNext: subcategory !== undefined }));
  }, []);

  const categoryKey = Object.keys(categories).map((cat) => ({ label: cat, value: cat }));
  const subcategoryKey = categories[category] && categories[category].map((cat) => ({ label: cat, value: cat }));

  const handleClick = () => {
    setStep((prev) => (prev += 1));
    setAppState((prev) => ({ ...prev, isNext: false }));
  };
  const handleCategory = (e) => setAppState((prev) => ({ ...prev, category: e.value }));
  const handleSubCategory = (e) => setAppState((prev) => ({ ...prev, subcategory: e.value, isNext: true }));

  // TBD UI fix hover color
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      background: '#141414',
      border: '1px solid #FFFFFF',
      borderRadius: '15px'
    }),
    control: (provided) => ({
      ...provided,
      background: 'rgba(107, 255, 255, 0.05)',
      border: '1px solid #FFFFFF',
      borderRadius: '15px',
      '&:hover': {
        background: 'rgba(107, 255, 255, 0.05)',
        cursor: 'pointer'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: '0.9em',
      color: '#B0F6FF',
      background: state.isSelected ? 'rgba(107, 255, 255, 0.2)' : 'transparent',
      '&:hover': {
        background: 'rgba(107, 255, 255, 0.05)',
        cursor: 'pointer'
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#B0F6FF',
      fontSize: '0.9em'
    }),
  }

  // TBD Type selection will not affect MVP implementation, it's preparation for Streaming features

  return (
    <MainContainer>
      <SectionTitle title="Categorize your project" subtitle={'These will help backers find your project, and you can change them later if you need to.'} />
      <SiteContainer>
        <ProjectTypeSelection/>
        <Container>
          <Select
            className="select-category"
            defaultValue={{ label: category || "Select Category", value: category }}
            options={categoryKey}
            onChange={handleCategory}
            styles={customStyles}
          />
          <Select
            className="select-category"
            defaultValue={{ label: subcategory || "Select Subcategory", value: subcategory }}
            placeholder="Select SubCategory"
            options={subcategoryKey}
            onChange={handleSubCategory}
            styles={customStyles}
          />
        </Container>
        <ButtonContainer>
          <Link href='/'><NextButton>Back to homepage</NextButton></Link>
          {subcategory ? <NextButton onClick={handleClick}>Next</NextButton> : <DisButton disabled>Next</DisButton>}
        </ButtonContainer>
      </SiteContainer>
    </MainContainer>
  );
};

export default Category;
