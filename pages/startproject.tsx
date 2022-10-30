import { useState } from "react";
import Stepper from "../components/form/Stepper";
import SetRewards from '../sections/start_project/SetRewards';
import SetGoals from "../sections/start_project/SetGoals";
import Category from "../sections/start_project/Category";
import TellStory from "../sections/start_project/TellStory";
import Create from "../sections/start_project/Create";

interface ItemProps {
  step: Number;
}

const StartProject = () => {
  const steps = ["Categorize", "Tell story", "Set goals", "Offer rewards", "Create project"];
  const [step, setStep] = useState<Number>(0);

  const handleStepper = (e: Number) => {
    setStep(e);
  };

  const RenderItem = (props: ItemProps): JSX.Element | null => {
    switch (props.step) {
      case 0:
        return <Category setStep={setStep} />;

      case 1:
        return <TellStory setStep={setStep} />;

      case 2:
        return <SetGoals setStep={setStep} />;

      case 3:
        return <SetRewards setStep={setStep} />;

      case 4:
        return <Create setStep={setStep} />;
      }

    return null;
  };

  return (
    <>
      <Stepper handleStep={handleStepper} steps={steps} step={step} />

      <RenderItem step={step} />
    </>
  );
};

export default StartProject;
