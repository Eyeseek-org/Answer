import React, { useState } from 'react';
import { TabHeader, TabsContainer } from './Tab.styles';

export interface TabsContent {
  label: string;
  component: React.ReactNode;
}

interface TabProps {
  tabs: TabsContent[];
}

export const Tab = ({ tabs }: TabProps): JSX.Element => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <>
      <TabsContainer>
        {tabs.map((tab, index) => {
          return <TabHeader onClick={() => setActiveTabIndex(index)}>{tab.label}</TabHeader>;
        })}
      </TabsContainer>
      {tabs[activeTabIndex].component}
    </>
  );
};
