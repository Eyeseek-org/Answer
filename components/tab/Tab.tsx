import React, { useState } from 'react';
import { TabHeader, TabsContainer } from './Tab.styles';

export interface TabsContent {
  active: string;
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
          return <>
           {tab.active === tab.label ?  <TabHeader onClick={() => setActiveTabIndex(index)}>{tab.label}</TabHeader> : <TabHeader onClick={() => setActiveTabIndex(index)}>{tab.label}</TabHeader>}
          </>
        })}
      </TabsContainer>
      {tabs[activeTabIndex].component}
    </>
  );
};
